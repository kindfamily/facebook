



window.addEventListener('DOMContentLoaded',function(){


    (function(){


        const leftBox = document.querySelector('.left_box');
        const save = document.querySelector('#save');
        const friends = document.querySelector('#friends');
        const close = document.querySelector('.close');





        leftBox.style.right = `${innerWidth*0.5 + 430}px`;





        function resizeFunc(){

            leftBox.style.right = `${innerWidth*0.5 + 430}px`;
        }





        function clickFunc(e){
            let elem = e.target;
            console.log(elem.dataset);
            console.log();

            // .classList.remove('active');


            if(elem.dataset.name === 'save'){

                elem.parentNode.classList.add('active');
                elem.parentNode.nextSibling.nextSibling.classList.remove('active');
                save.classList.remove('hidden');
                friends.classList.add('hidden');


            }else if(elem.dataset.name === 'friends'){

                elem.parentNode.classList.add('active');
                elem.parentNode.previousSibling.previousSibling.classList.remove('active');
                friends.classList.remove('hidden');
                save.classList.add('hidden');

            }

        }



        function closeFunc(e){
            console.log();
            this.parentNode.remove();
        }

        leftBox.addEventListener('click',clickFunc);


        close.addEventListener('click',closeFunc);


        window.addEventListener('resize',resizeFunc);





    })();




});



