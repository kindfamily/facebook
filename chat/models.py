from django.db import models
from django.conf import settings

class Room(models.Model):
    room_name = models.CharField(max_length=100, blank=True)
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True, 
        related_name='rooms')

    def __str__(self):
        return self.room_name

class Message(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    room = models.ForeignKey(Room, related_name='messages', default=1, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content