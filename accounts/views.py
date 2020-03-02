from django.contrib.auth import authenticate, login
from django.contrib.auth import logout as django_logout

from django.shortcuts import get_object_or_404, redirect, render
from .forms import SignupForm, LoginForm
from .models import *


from django.contrib.auth import get_user_model
import json
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST



def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            return redirect('accounts:login')
    else:
        form = SignupForm()
        
        
    if request.is_ajax():
        profile, created_at = Profile.objects.get_or_create(user=user_id)

        if created_at:
            message = '이미 가입된 사용자입니다!'
            status = 1
        else:
            profile.delete()
            message = '회원가입 간입가능'
            status = 0

        context = {
            'message': message,
            'status': status,
        }
        return HttpResponse(json.dumps(context), content_type="application/json")
        
        
        return render(request, 'post/post_list_ajax.html', {
            'posts': posts,
            'comment_form': comment_form,
        })  
        
    return render(request, 'accounts/signup.html', {
        'form': form,
    })

def login_check(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        name = request.POST.get('username')
        pwd = request.POST.get('password')
        
        user = authenticate(username=name, password=pwd)
        
        if user is not None:
            login(request, user)
            return redirect("/")
        else:
            return render(request, 'accounts/login_fail.html')
    else:
        form = LoginForm()
        return render(request, 'accounts/login.html', {"form":form})
    
def logout(request):
    django_logout(request)
    return redirect("/")

@login_required
@require_POST
def follow(request):
    from_user = request.user.profile
    pk = request.POST.get('pk')
    to_user = get_object_or_404(Profile, pk=pk)
    follow, created = Follow.objects.get_or_create(from_user=from_user, to_user=to_user)
    
    if created:
        message = '팔로우 시작!'
        status = 1
    else:
        follow.delete()
        message = '팔로우 취소'
        status = 0
        
    context = {
        'message': message,
        'status': status,
    }
    return HttpResponse(json.dumps(context), content_type="application/json")


def create_friend_request(request):
    user_id = request.POST.get('pk', None)
    # 커런트유저 가져오기
    user = request.user
    # 타겟유저 가져오기
    target_user = get_object_or_404(get_user_model(), pk=user_id)
    # 프랜드리퀘슽, 만들기 > model에서 확인 shell 이용
    
    try:
        user.friend_requests.create(from_user=user, to_user=target_user)
        context = {'result': 'succes'}
    except Exception as ex: # 에러 종류
        print('에러가 발생 했습니다', ex) # ex는 발생한 에러의 이름을 받아오는 변수
        context = {
            'result': 'error',
        }

    return HttpResponse(json.dumps(context), content_type="application/json")


def accept_friend_request(request, friend_request_id):
    # 요청 
    friend_request = FriendRequest.objects.get(pk=friend_request_id)

    # 커런트유저 가져오기
    from_user = friend_request.from_user
    
    # 타겟유저 가져오기
    to_user = friend_request.to_user

    try:
        # 친구관계 생성
        room_name= "{},{}".format(from_user.username, to_user.username)

        # 채팅방을 만들고
        room = Room.objects.create(room_name=room_name)
        Friend.objects.create(user=from_user, current_user=to_user, room=room)
        Friend.objects.create(user=to_user, current_user=from_user, room=room)

        # 현재 만들어진 친구요청을 삭제
        friend_request.delete()

        context = {
            'result': 'success',
        }
    except Exception as ex:
        print('에러가 발생 했습니다', ex) # ex는 발생한 에러의 이름을 받아오는 변수
        context = {
            'result': 'error',
        }
    
    return HttpResponse(json.dumps(context), content_type="application/json")