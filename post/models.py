from django.conf import settings
from django.db import models
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import re

from accounts.models import *


def photo_path(instance, filename):
    from time import strftime
    from random import choice
    import string
    arr = [choice(string.ascii_letters) for _ in range(8)]
    pid = ''.join(arr)
    extension = filename.split('.')[-1]
    return '{}/{}/{}.{}'.format(strftime('post/%Y/%m/%d/'), instance.author.username, pid, extension)


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = ProcessedImageField(upload_to=photo_path,
                                processors=[ResizeToFill(600, 600)],
                                format='JPEG',
                                options={'quality': 90})
    content = models.CharField(max_length=140, help_text="최대 140자 입력 가능")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    tag_set = models.ManyToManyField('Tag', blank=True)

    like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                           blank=True,
                                           related_name='like_post_set',
                                           through='Like')  
    bookmark_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                           blank=True,
                                           related_name='bookmark_post_set',
                                           through='Bookmark')

    class Meta:
        ordering = ['-created_at']

   
    # NOTE: content에서 tags를 추출하여, Tag 객체 가져오기, 신규 태그는 Tag instance 생성, 본인의 tag_set에 등록,
    def tag_save(self):
        tags = re.findall(r'#(\w+)\b', self.content)

        if not tags:
            return

        for t in tags:
            tag, tag_created = Tag.objects.get_or_create(name=t)
            self.tag_set.add(tag)  # NOTE: ManyToManyField 에 인스턴스 추가

    @property
    def like_count(self):
        return self.like_user_set.count()
    
    @property
    def bookmark_count(self):
        return self.bookmark_user_set.count()

    def __str__(self):
        return self.content



class Tag(models.Model):
    name = models.CharField(max_length=140, unique=True)

    def __str__(self):
        return self.name




class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (
            ('user', 'post')
        )
        
class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (
            ('user', 'post')
        )
        




class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment_set')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.content
