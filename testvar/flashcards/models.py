from django.db import models
from django.contrib.auth.models import User

class Flashcard(models.Model):
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    difficulty = models.CharField(
        max_length=10,
        choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')],
        null=True, blank=True
    )

    def __str__(self):
        return self.question


class FlashcardSet(models.Model):
    name = models.CharField(max_length=100)
    cards = models.ManyToManyField(Flashcard, related_name='sets')
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,  # Temporarily allow nulls for migration
        default=1   # Replace with the ID of a valid user in your database
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @staticmethod
    def user_daily_limit_reached(user):
        from django.utils.timezone import now
        today = now().date()
        count_today = FlashcardSet.objects.filter(created_by=user, created_at__date=today).count()
        return count_today >= 20


class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flashcard_sets = models.ManyToManyField(FlashcardSet, related_name='collections')
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"Collection by {self.user.username}"


class HiddenFlashcard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    hidden = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.flashcard.question} hidden by {self.user.username}"


class Comment(models.Model):
    flashcard_set = models.ForeignKey(FlashcardSet, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    rating = models.IntegerField(default=5)

    def __str__(self):
        return f"{self.user.username} - {self.flashcard_set.name}: {self.comment}"
