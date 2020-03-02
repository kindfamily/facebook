from django.shortcuts import render

# Create your views here.
def chat_list(request):
    return render(request, 'chat/chat_list.html')