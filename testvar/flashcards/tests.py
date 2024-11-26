from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import Flashcard, FlashcardSet, Collection, Comment


class APITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.client.login(username='testuser', password='testpass')

        # Create flashcards, flashcard sets, and collections for testing
        self.flashcard1 = Flashcard.objects.create(question="What is Python?", answer="A programming language")
        self.flashcard2 = Flashcard.objects.create(question="What is Django?", answer="A web framework")

        self.flashcard_set = FlashcardSet.objects.create(name="Test Set", created_by=self.user)
        self.flashcard_set.cards.add(self.flashcard1, self.flashcard2)

        self.collection = Collection.objects.create(user=self.user, comment="Test collection")
        self.collection.flashcard_sets.add(self.flashcard_set)

    # General
    def test_get_api_version(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('version', response.data)

    # Flashcard Sets
    def test_get_flashcard_sets(self):
        response = self.client.get('/api/sets/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_flashcard_set(self):
        data = {'name': 'New Set', 'cards': [self.flashcard1.id, self.flashcard2.id]}
        response = self.client.post('/api/sets/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_flashcard_set_by_id(self):
        response = self.client.get(f'/api/sets/{self.flashcard_set.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_flashcard_set(self):
        data = {'name': 'Updated Test Set', 'cards': [self.flashcard1.id, self.flashcard2.id]}
        response = self.client.put(f'/api/sets/{self.flashcard_set.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_delete_flashcard_set(self):
        response = self.client.delete(f'/api/sets/{self.flashcard_set.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_flashcards_in_set(self):
        response = self.client.get(f'/api/sets/{self.flashcard_set.id}/cards/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_comment_on_flashcard_set(self):
        data = {'comment': 'This is a great set!', 'rating': 5}
        response = self.client.post(f'/api/set/{self.flashcard_set.id}/comment/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Collections
    def test_get_collections(self):
        response = self.client.get('/api/collections/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_collection(self):
        data = {'comment': 'New Collection', 'flashcard_sets': [self.flashcard_set.id]}
        response = self.client.post('/api/collections/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_collection_by_id(self):
        response = self.client.get(f'/api/users/{self.user.id}/collections/{self.collection.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_collection(self):
        data = {'comment': 'Updated Collection'}
        response = self.client.put(f'/api/users/{self.user.id}/collections/{self.collection.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_collection(self):
        response = self.client.delete(f'/api/users/{self.user.id}/collections/{self.collection.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # Random Collection
    def test_get_random_collection(self):
        response = self.client.get('/api/collections/random/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # Users
    def test_get_all_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {'username': 'newuser', 'password': 'newpass'}
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_by_id(self):
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        data = {'username': 'updateduser'}
        response = self.client.put(f'/api/users/{self.user.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        response = self.client.delete(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # Error Handling
    def test_get_nonexistent_flashcard_set(self):
        response = self.client.get('/api/sets/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_nonexistent_collection(self):
        response = self.client.get(f'/api/users/{self.user.id}/collections/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_nonexistent_user(self):
        response = self.client.get('/api/users/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
