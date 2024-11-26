from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FlashcardSetViewSet, CollectionViewSet, api_version, user_sets,
    user_collections, user_collection_detail, get_all_users,
    user_detail, random_collection
)

router = DefaultRouter()
router.register(r'sets', FlashcardSetViewSet, basename='flashcardset')
router.register(r'collections', CollectionViewSet, basename='collection')

urlpatterns = [
    # General
    path('', api_version, name='api-version'),

    # API Endpoints
    path('api/', include(router.urls)),  # Includes all registered routes

    # Flashcard Set Extra Endpoints
    path('api/sets/<int:setId>/cards/', FlashcardSetViewSet.as_view({'get': 'cards'}), name='flashcard-set-cards'),
    path('api/sets/<int:setId>/add_flashcard/', FlashcardSetViewSet.as_view({'post': 'add_flashcard'}), name='flashcard-set-add-flashcard'),
    path('api/set/<int:setID>/comment/', FlashcardSetViewSet.as_view({'post': 'comment'}), name='flashcard-set-comment'),

    # User Endpoints
    path('api/users/', get_all_users, name='get-all-users'),
    path('api/users/<int:user_id>/', user_detail, name='user-detail'),
    path('api/users/<int:userID>/sets/', user_sets, name='user-sets'),
    path('api/users/<int:userID>/collections/', user_collections, name='user-collections'),
    path('api/users/<int:user_id>/collections/<int:collection_id>/', user_collection_detail, name='user-collection-detail'),

    # Collections Extra Endpoints
    path('api/collections/random/', random_collection, name='random-collection'),
]
