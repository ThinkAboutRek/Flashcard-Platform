from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Flashcard, FlashcardSet, Collection, Comment
from .serializers import (
    FlashcardSerializer, FlashcardSetSerializer, CollectionSerializer, CommentSerializer
)
import random


@api_view(['GET'])
def api_version(request):
    """
    Return the API version.
    """
    return Response({"version": "1.0.0"})


class FlashcardSetViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Flashcard Sets.
    """
    queryset = FlashcardSet.objects.all()
    serializer_class = FlashcardSetSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Create a flashcard set and associate it with the authenticated user.
        """
        user = self.request.user
        if FlashcardSet.user_daily_limit_reached(user):
            return Response(
                {"error": "Daily limit for creating flashcard sets reached."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )
        serializer.save(created_by=user)

    def perform_update(self, serializer):
        """
        Allow updating the flashcard set, including modifying the cards.
        """
        serializer.save()

    @action(detail=True, methods=['get'])
    def cards(self, request, pk=None):
        """
        Get all flashcards in a set, with optional shuffling.
        """
        flashcard_set = self.get_object()
        flashcards = flashcard_set.cards.all()
        if request.query_params.get('shuffle', '').lower() == 'true':
            flashcards = list(flashcards)
            random.shuffle(flashcards)
        serializer = FlashcardSerializer(flashcards, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def add_flashcard(self, request, pk=None):
        """
        Create a new flashcard and add it to the specified flashcard set.
        """
        flashcard_set = self.get_object()
        serializer = FlashcardSerializer(data=request.data)
        if serializer.is_valid():
            flashcard = serializer.save()
            flashcard_set.cards.add(flashcard)  # Add the new flashcard to the set
            flashcard_set.save()
            return Response({"message": "Flashcard added successfully.", "flashcard": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def comment(self, request, setID=None):
        """
        Add a comment to a flashcard set.
        """
        flashcard_set = get_object_or_404(FlashcardSet, id=setID)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, flashcard_set=flashcard_set)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put', 'delete'])
    def manage(self, request, pk=None):
        """
        Handle PUT (update) and DELETE operations for flashcard sets.
        """
        flashcard_set = self.get_object()
        if request.method == 'PUT':
            serializer = FlashcardSetSerializer(flashcard_set, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            flashcard_set.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class CollectionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Collections.
    """
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Save the collection and associate it with the current user.
        """
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def random(self, request):
        """
        Redirect to a random flashcard set collection.
        """
        collections = Collection.objects.all()
        if not collections.exists():
            return Response({"error": "There are no collections available."}, status=status.HTTP_404_NOT_FOUND)
        random_collection = random.choice(collections)
        serializer = CollectionSerializer(random_collection)
        return Response(serializer.data)


@api_view(['GET'])
def random_collection(request):
    """
    Redirect to a random flashcard set collection.
    """
    collections = Collection.objects.all()
    if not collections.exists():
        return Response({"error": "There are no collections available."}, status=status.HTTP_404_NOT_FOUND)
    random_collection = random.choice(collections)
    serializer = CollectionSerializer(random_collection)
    return Response(serializer.data)



@api_view(['GET', 'POST'])
def get_all_users(request):
    """
    Handle GET for listing all users and POST for creating a new user.
    """
    class UserSerializer(ModelSerializer):
        class Meta:
            model = User
            fields = ['id', 'username', 'password', 'is_staff', 'is_superuser']

    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            User.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
                is_staff=serializer.validated_data.get('is_staff', False),
                is_superuser=serializer.validated_data.get('is_superuser', False)
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_sets(request, user_id):
    """
    Get all flashcard sets created by a user.
    """
    sets = FlashcardSet.objects.filter(created_by_id=user_id)
    if not sets.exists():
        return Response({"error": "User has no flashcard sets."}, status=status.HTTP_404_NOT_FOUND)
    serializer = FlashcardSetSerializer(sets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def user_collections(request, user_id):
    """
    Get all collections created by a user.
    """
    collections = Collection.objects.filter(user_id=user_id)
    if not collections.exists():
        return Response({"error": "User has no collections."}, status=status.HTTP_404_NOT_FOUND)
    serializer = CollectionSerializer(collections, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def user_collection_detail(request, user_id, collection_id):
    """
    Handle GET, PUT, DELETE for a user's collection by ID.
    """
    collection = get_object_or_404(Collection, user_id=user_id, id=collection_id)

    if request.method == 'GET':
        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = CollectionSerializer(collection, data=request.data, partial=True)  # Allow partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print("Validation Errors:", serializer.errors)  # Debug validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, user_id):
    """
    Handle GET, PUT, DELETE for a user by ID.
    """
    user = get_object_or_404(User, id=user_id)

    if request.method == 'GET':
        return Response({"id": user.id, "username": user.username, "is_staff": user.is_staff, "is_superuser": user.is_superuser})

    if request.method == 'PUT':
        data = request.data
        if 'username' in data:
            user.username = data['username']
        if 'password' in data:
            user.set_password(data['password'])
        user.is_staff = data.get('is_staff', user.is_staff)
        user.is_superuser = data.get('is_superuser', user.is_superuser)
        user.save()
        return Response({"id": user.id, "username": user.username, "is_staff": user.is_staff, "is_superuser": user.is_superuser})

    if request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
