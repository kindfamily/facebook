



window.addEventListener('DOMContentLoaded',function(){


    (function(){


        const feed = document.querySelector('#contents_container');
        // const commentField = document.querySelector('#comment_container');
        const leftBox = document.querySelector('.left_box');
        // const createBox = document.querySelector('.create_box');
        const rightBox = document.querySelector('.right_box');
        const chart_btn = document.querySelector('.right_box .btn_container');
        const btnAll = document.querySelectorAll('.right_box .btn_container > div');
        const chartAll = document.querySelectorAll('.right_box .chart_container > div');
        
        const bell = document.querySelector('#header .bell');
        const noticeBoard = document.querySelector('#header .notice');
        // const sideBox = document.querySelectorAll('#side_box > ul > li');
        // const detailCard = document.querySelector('#detail_card');
        const submit  = document.querySelector( "#submitBtn" );

        leftBox.style.right = `${innerWidth*0.5 + 430}px`;
        rightBox.style.left = `${innerWidth*0.5 + 90}px`;

        function resizeFunc(){

            leftBox.style.right = `${innerWidth*0.5 + 430}px`;
            rightBox.style.left = `${innerWidth*0.5+ 90}px`;
        }

        // function delegation(e){
        //     let elem = e.target;
        //     e.stopPropagation();

        //     console.log(elem);

        //     while (!elem.getAttribute('data-name')) {
        //         elem = elem.parentNode;

        //         if (elem.nodeName === 'BODY') {
        //             elem = null;
        //             return;
        //         }
        //     }

        //     if (elem.matches('[data-name="like"]')) {

        //         console.log('좋아요!');
        //         let pk = elem.getAttribute('name');
        //         elem.classList.toggle('active');

        //         $.ajax({
        //             type:'POST',
        //             url:'data/like.json',
        //             data:{pk},
        //             dataType:'json',
        //             success: function(response){

        //                 let likeCount = document.querySelector('#like-count-37');
        //                 likeCount.innerHTML =  response.like_count ;

        //             },
        //             error:function(request,status,error){
        //                 alert('로그인이 필요합니다.');
        //                 // window.location.replace('https://www.naver.com');
        //             }

        //         })




        //     }else if (elem.matches('[data-name="delete"]')) {

        //         if(confirm('정말 삭제할거야?') === true){

        //             $.ajax({
        //                 type:'POST',
        //                 url:'data/delete.json',
        //                 data:{
        //                     'pk':37,
        //                 },
        //                 dataType:'json',
        //                 success:function(response){
        //                     if(response.status){
        //                         let comt = document.querySelector('.comment-37');
        //                         comt.remove();
        //                     }
        //                 },
        //                 error:function(request,status,error){
        //                     alert('문제가 발생했습니다.');

        //                 }
        //             });
        //         }


        //     }else if (elem.matches('[data-name="add"]')) {


        //         console.log('ddd');
        //         submit.disabled = false;
        //         submit.parentNode.style.display = 'block';

        //     }else{

        //     }


        // }

        function chartFunc(e){
            console.log(e.target.dataset);

            let elem = e.target;


            for(let i=0;i<3;i++){
                btnAll[i].classList.remove('active');
                chartAll[i].classList.remove('active');
            }

            elem.classList.add('active');

            if( elem.dataset.name === 'chart01'){
                console.log('1번');
                chartAll[0].classList.add('active');

            }else if( elem.dataset.name === 'chart02'){
                console.log('2번');
                chartAll[1].classList.add('active');

            }else if( elem.dataset.name === 'chart03'){
                console.log('3번');
                chartAll[2].classList.add('active');
            }


        }

        function noticeFunc(e){
            e.stopPropagation();
            this.classList.toggle('on');

            if(this.classList.contains('on')){
                noticeBoard.style.display = 'block';
            }else{
                noticeBoard.style.display = 'none';
            }
        }

        function scrollFunc(e){
            // console.log(e);
            // console.log(pageYOffset);


            let scrollHeight = pageYOffset + window.innerHeight;
            let documentHeight = document.body.scrollHeight;

            console.log('scrollHeight : ' + scrollHeight);
            console.log('documentHeight : ' +documentHeight);



            if(scrollHeight >= documentHeight){
                let pager = document.querySelector('#page');
                let page = document.querySelector('#page').value;

                pager.value = parseInt(page) + 1; // 증가 시킴


                console.log(page);

                callMorePostAjax(page);

                if( page > 5){
                    return;
                }

            }



        }

        // function callMorePostAjax(page){

        //     if( page > 5){
        //         return;
        //     }

        //     $.ajax({
        //         type:'POST',
        //         url:'data/post.html',
        //         data:{
        //             'page':page,
        //         },
        //         dataType:'html',
        //         success: addMorePostAjax,
        //         error:function(request,status,error){
        //             alert('문제가 발생했습니다.');
        //             // window.location.replace('https://www.naver.com');

        //         }

        //     })
        // }

        // function addMorePostAjax(data){
        //     feed.insertAdjacentHTML('beforeend',data);
        // }

        // const txt = document.querySelector('#comment37');

        txt.addEventListener('keypress',function(e){
            console.log(e.code);
            let content =  txt.value;
            console.log(content);

            if(e.code === 'Enter') {

                if(content.length > 140){
                    alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 : ' + content.length);
                    return;
                }


                $.ajax({

                    type:'POST',
                    url:'data/comment.html',
                    data:{
                        'pk' : 37,
                        'content':content,
                    },
                    dataType:'html',
                    success:function(data){
                        document.querySelector('.comment_container').insertAdjacentHTML('beforeend',data);
                    },
                    error:function(request,status,error){
                        alert('문제가 발생했습니다.');

                    }
                });

                txt.value = '';
            }


        });

        chart_btn.addEventListener('click',chartFunc);
        bell.addEventListener('click',noticeFunc);
        
        // feed.addEventListener('click',delegation);

        window.addEventListener('scroll',scrollFunc);
        window.addEventListener('resize',resizeFunc);

        document.body.addEventListener('click',(e)=>{
            submit.parentNode.style.display = 'none';
            submit.disabled = true;

            noticeBoard.style.display = 'none';
            bell.classList.remove('on');

        });



    })();




});



