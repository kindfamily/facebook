from django.urls import path
from .views import *

app_name = 'bookmark_friends'

urlpatterns = [
    
    path('', bookmark_friends_list, name='bookmark_friends_list'), 
    
]