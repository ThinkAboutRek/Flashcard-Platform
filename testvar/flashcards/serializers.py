from rest_framework import serializers
from .models import Flashcard, FlashcardSet, Collection, HiddenFlashcard, Comment

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'question', 'answer', 'difficulty']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'rating', 'user']


class FlashcardSetSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Flashcard.objects.all()
    )  # Allow selecting flashcards by their IDs.

    comments = serializers.SerializerMethodField()  # Display comments, but not directly writable.

    class Meta:
        model = FlashcardSet
        fields = ['id', 'name', 'cards', 'comments', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def get_comments(self, obj):
        comments = obj.comments.all()
        return CommentSerializer(comments, many=True).data



class SimpleFlashcardSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlashcardSet
        fields = ['id', 'name']


class CollectionSerializer(serializers.ModelSerializer):
    flashcard_sets = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=FlashcardSet.objects.all(),
        required=True
    )

    class Meta:
        model = Collection
        fields = ['id', 'user', 'flashcard_sets', 'comment']
        read_only_fields = ['id','user']



class HiddenFlashcardSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    flashcard = FlashcardSerializer()

    class Meta:
        model = HiddenFlashcard
        fields = ['id', 'user', 'flashcard', 'hidden']
