from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, render
from .models import Room
from accounts.models import Friend, Profile
import logging

# Create your views here.
def chat_list(request):
    user = request.user
    user_profile = user.profile

    friends = user.friends.all()

    return render(request, 'chat/chat_list.html', {
        'user_profile': user_profile,
        'friends': friends,
    })


def room(request, room_id):
    user = request.user
    user_profile = user.profile

    friends = user.friends.all()

    room = Room.objects.get(pk=room_id)
    friend_user = room.users.all().exclude(pk=user.id).first()

    return render(request, 'chat/room.html', {
        'current_user': user,
        'user_profile': user_profile,
        'friends': friends,
        'room': room,
        'friend_user': friend_user,
    })

# def friend_request(request):
#     return render(request, 'friend/')    