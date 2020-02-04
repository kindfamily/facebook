from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.safestring import mark_safe
import json
from django.contrib.auth.models import User
from .models import Room

def index(request):
    users = User.objects.all()
    return render(request, 'chat/index.html', {'users':users})

@login_required
def room(request, username):
    users = User.objects.all()

    return render(request, 'chat/room.html', {
        'room_name_json': mark_safe(json.dumps(username)),
        'username': mark_safe(json.dumps(request.user.username)),
        'users': users,
    })