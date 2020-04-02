from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect, render
from post.models import *

# Create your views here.
def bookmark_friends_list(request):
    username = request.user
    user = get_object_or_404(get_user_model(), username=username)
    user_profile = user.profile

    friend_requests = user.requested_friend_requests.all()
    friends = username.friends.all()

    post_list = Post.objects.all()

    return render(request, 'bookmark_friends/bookmark_friends_list.html', {
        'user_profile': user_profile,
        'friend_requests': friend_requests,
        'friends': friends,
        'post_list': post_list,
    })

