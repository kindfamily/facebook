from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import *
import json
import logging
from django.contrib.auth import get_user_model

class ChatConsumer(WebsocketConsumer):
  	# websocket 연결 시 실행
    def connect(self):
        logger = logging.getLogger(__name__)
        logger.error('======connect======')
        logger.error('======self======' + self.__class__.__name__)

        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_channel_layer_group = self.room_id

        # self.channel_layer.group_add(self.room_channel_layer_group,self.channel_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_channel_layer_group,
            self.channel_name
        )

        # WebSocket 연결
        self.accept()

        messages = Message.objects.filter(room_id=self.room_id)
        
        for message in messages:
            self.send(text_data=json.dumps({
                'user_id': message.user.id,
                'user_name': message.user.username,
                'command': 'saved_message',
                'message': message.content,
            }))   

		# websocket 연결 종료 시 실행 
    def disconnect(self, close_code):
        # 그룹에서 Leave
        async_to_sync(self.channel_layer.group_discard)(
            self.room_channel_layer_group,
            self.channel_name
        )

		# 클라이언트로부터 메세지를 받을 시 실행
    def receive(self, text_data):
        User = get_user_model()

        logger = logging.getLogger(__name__)
        logger.error(text_data)


        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_channel_layer_group = self.room_id

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user_id = text_data_json['user_id']
        user_name = text_data_json['user_name']
        
        logger.error("message : " + message)
		# 클라이언트로부터 받은 메세지를 다시 클라이언트로 보내준다.
        

        message_object = Message.objects.create(
            # 외래키로 저장할때
            user=User(pk=user_id),
            # 일반필드로 저장할때
            content=message,
            room=Room(pk=self.room_id)
        )


        async_to_sync(self.channel_layer.group_send)(
            self.room_channel_layer_group,
            {
                'type': 'chat_message',
                'message': message,
                'user_name': user_name,
                'user_id': user_id,
            }
        )

    def chat_message(self, event):
        message = event['message']
        user_name = event['user_name']
        user_id = event['user_id']

        # WebSocket 에게 메세지 전송
        self.send(text_data=json.dumps({
            'command': 'new_message',
            'message': message,
            'user_name': user_name,
            'user_id': user_id,
        }))