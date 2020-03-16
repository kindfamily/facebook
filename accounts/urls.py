from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login_check, name='login'),
    path('logout/', logout, name='logout'),
    
    path('follow/', follow, name='follow'),

    path('create_friend_request/', create_friend_request, name='create_friend_request'),
    path('accept_friend_request/', accept_friend_request, name='accept_friend_request'),
]