from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Room(models.Model):
    room_name = models.CharField(max_length=100, blank=True)
    # 참석자 리스트
    # attendees = models.ManyToManyField(User, related_name='rooms', blank=True)

    def __str__(self):
        return self.room_name

class Message(models.Model):
    # room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE, default=0 )
    author = models.ForeignKey(User, related_name='messages', on_delete=models.CASCADE, default=0 )
    content = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username

    def last_10_messages():
        return Message.objects.order_by('-timestamp').all()[:10]
