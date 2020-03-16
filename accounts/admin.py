from django.contrib import admin
from .models import Profile
from accounts.models import *


# Register your models here.


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'nickname', 'user']
    list_display_links = ['nickname', 'user']
    search_fields = ['nickname']
    

@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = ['current_user', 'user', 'room', 'created_at']
    list_display_links = ['current_user', 'user', 'room']
    
@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'from_user', 'to_user', 'created_at']
    list_display_links = ['from_user', 'to_user', 'created_at']