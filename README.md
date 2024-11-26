# TestVar - Flashcards API

TestVar is a revolutionary REST API for creating, managing, and interacting with flashcards. This project provides an intuitive interface for handling flashcard sets, flashcards, user collections, and user management.

## Features
- **Flashcard Sets**: Create, retrieve, update, and delete flashcard sets.
- **Flashcards**: Add flashcards to sets, retrieve flashcards, and add comments.
- **Collections**: Group flashcard sets into collections and manage them.
- **Users**: User creation, retrieval, and user-specific management of flashcards and collections.

## Technologies Used
- **Python**: Language used for backend development.
- **Django**: The main framework for building the application.
- **Django REST Framework (DRF)**: Used for creating the API.
- **SQLite**: Default database for development purposes.

## Installation
Follow these steps to set up and run the project locally.

### Prerequisites
- Python 3.8+
- Django 4.0+

### Setup Instructions
1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd testvar
   ```

2. **Create a Virtual Environment**
   ```sh
   python -m venv env
   ```

3. **Activate the Virtual Environment**
   - **Windows**:
     ```sh
     .\env\Scripts\activate
     ```
   - **Linux/Mac**:
     ```sh
     source env/bin/activate
     ```

4. **Install Dependencies**
   ```sh
   pip install -r requirements.txt
   ```

5. **Apply Migrations**
   ```sh
   python manage.py migrate
   ```

6. **Create a Superuser**
   ```sh
   python manage.py createsuperuser
   ```

7. **Run the Development Server**
   ```sh
   python manage.py runserver
   ```
   Your server will start at `http://127.0.0.1:8000/`.

## API Documentation
The API is structured around the following endpoints:

### General Endpoints
- `GET /` - Return the current version of the API.

### Flashcard Set Endpoints
- `GET /api/sets/` - Retrieve all flashcard sets.
- `POST /api/sets/` - Create a new flashcard set.
- `GET /api/sets/{setId}/` - Get a specific flashcard set by ID.
- `PUT /api/sets/{setId}/` - Update a flashcard set by ID.
- `DELETE /api/sets/{setId}/` - Delete a flashcard set by ID.
- `GET /api/sets/{setId}/cards/` - Retrieve all flashcards in a set.
- `POST /api/set/{setID}/comment/` - Add a comment to a flashcard set.
- `POST /api/sets/{setId}/add_flashcard/` - Add a flashcard to an existing set.

### User Endpoints
- `GET /api/users/` - Retrieve all users.
- `POST /api/users/` - Create a new user.
- `GET /api/users/{userId}/` - Retrieve a user by ID.
- `PUT /api/users/{userId}/` - Update a user by ID.
- `DELETE /api/users/{userId}/` - Delete a user by ID.
- `GET /api/users/{userID}/sets/` - Retrieve all flashcard sets created by a user.
- `GET /api/users/{userID}/collections/` - Retrieve all collections created by a user.
- `GET /api/users/{userID}/collections/{collectionID}/` - Retrieve a specific collection by ID.
- `PUT /api/users/{userID}/collections/{collectionID}/` - Update a specific collection by ID.
- `DELETE /api/users/{userID}/collections/{collectionID}/` - Delete a collection by ID.

### Collection Endpoints
- `GET /api/collections/` - Retrieve all collections.
- `POST /api/collections/` - Create a new collection.
- `GET /api/collections/random/` - Redirect to a random flashcard set collection.

## Testing
Run the following command to execute the unit tests for the project:
```sh
python manage.py test
```
All tests should pass successfully to ensure the project runs smoothly.

## Usage
- After setting up the project, you can use tools like Postman or CURL to interact with the API endpoints.
- Log in with the admin or create a new user to start managing flashcards.

## Project Structure
- `flashcards/` - Contains the models, views, serializers, and test cases for the project.
- `flashcards/models.py` - Contains the model definitions for Flashcard, FlashcardSet, Collection, Comment, and User.
- `flashcards/views.py` - Contains the API views for managing flashcard sets, flashcards, and collections.
- `flashcards/serializers.py` - Serializers for converting complex data to native Python data types.


Happy Flashcarding!
