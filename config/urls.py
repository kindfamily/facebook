from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from django.shortcuts import redirect


urlpatterns = [
    
    
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('allauth.urls')),

    path('bookmark_friends/', include('bookmark_friends.urls')),
    path('chat/', include('chat.urls')),
    
    path('post/', include('post.urls', namespace='post')),
    path('', lambda r: redirect('post:post_list'), name='root')
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         path('__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns

