window.addEventListener('DOMContentLoaded',function(){

    (function(){
        const inputUserId = document.querySelector('#user_id');
        const inputUserName = document.querySelector('#user_name');
        const inputRoomId = document.querySelector('#room_id');
        const userList = document.querySelector('#user_list');
        const timeLine = document.querySelector('#time_line');
        const txtMessage = document.querySelector('#txt_message');
        const btnSend = document.querySelector('#btn_send');
        const feed = document.querySelector('#feed');


        userList.style.height = `${innerHeight - 42}px`;
        timeLine.style.height = `${innerHeight - 42}px`;        

        const roomId = inputRoomId.value;
        const userId = inputUserId.value;
        const userName = inputUserName.value;

        // ws://localhost:8000/ws/chat/1/
        var chatSocket = new WebSocket(
            'ws://' + window.location.host + '/ws/chat/' + roomId +  '/'
        );

        chatSocket.onmessage = function(e) {
            console.log("받은 메세지 : ", e.data);
            
            var _data = JSON.parse(e.data);
            var message = _data.message;
            var user_name = _data.user_name;

            console.log(message);

            appendMessageToFeed(_data);

            txtMessage.value = '';

            feed.scrollTop = feed.scrollHeight; // 받은 메시지가 최하단에 보일수 있도록 처리 

            //var chatLog = document.querySelector("#chat-log");
            //chatLog.value = chatLog.value + user_name + ' : ' + message + "\n";
        }

        function appendMessageToFeed(data){
            const currentUserId = String(inputUserId.value);
            const message = data.message;
            const messageUserId = String(data.user_id);
            console.log(currentUserId, messageUserId);
            if(currentUserId === messageUserId) {
                appendMyMessageToFeed(message);
            } else {
                appendFriendMessageToFeed(message);
            }
        }

        function appendMyMessageToFeed(message) {

            let template = `
                <div>
                   <div class="to">
                       <div>${message}</div>
                   </div>
                </div>
            
            `;

            feed.insertAdjacentHTML('beforeend',template);
        }

        function appendFriendMessageToFeed(message) {

            let template = `
                <div>
                   <div class="from">
                       <div>${message}</div>
                   </div>
                </div>
            
            `;

            feed.insertAdjacentHTML('beforeend',template);
        }        

        function sendMessage() {
            var inputMessage = document.querySelector('#txt_message');
            var message = inputMessage.value;
            console.log(message);
            if(message) {
                chatSocket.send(JSON.stringify({
                    'user_id': userId, 
                    'user_name': userName,
                    'room_name': roomId,
                    'message': message
                }));
                inputMessage.value = '';
                inputMessage.focus();
            }
        }



        btnSend.addEventListener('click',sendMessage);
        txtMessage.addEventListener('keypress',function(e){
            console.log(e.code);
            if(e.code === 'Enter'){
                sendMessage();
            }
        })
    })();
});