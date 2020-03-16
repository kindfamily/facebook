from django.urls import path
from .views import *

app_name = 'chat'

urlpatterns = [
    
    path('', chat_list, name='chat_list'), 
    path('<str:room_id>/', room, name='room'),
    
]