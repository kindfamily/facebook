from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect, render

# Create your views here.
def bookmark_friends_list(request):
    username = request.user
    user = get_object_or_404(get_user_model(), username=username)
    user_profile = user.profile

    friend_requests = user.requested_friend_requests.all()

    return render(request, 'bookmark_friends/bookmark_friends_list.html', {
        'user_profile': user_profile,
        'friend_requests': friend_requests,
    })