




window.addEventListener('DOMContentLoaded',function(){




    (function(){



        const userList = document.querySelector('#user_list');
        const timeLine = document.querySelector('#time_line');
        const txt = document.querySelector('#txt');
        const btn = document.querySelector('#btn');
        const feed = document.querySelector('#feed');


        userList.style.height = `${innerHeight - 42}px`;
        timeLine.style.height = `${innerHeight - 42}px`;






        function sand(e){

            e.preventDefault();

            console.log(feed.scrollTop);
            console.log(txt.value);


            let template = `
            
                <div>
                   <div class="to">
                       <div>${txt.value}</div>
                   </div>
                </div>
            
            `;


            feed.insertAdjacentHTML('beforeend',template);
            txt.value = '';

        }




        btn.addEventListener('click',sand);
        txt.addEventListener('keypress',function(e){
            console.log(e.code);





            if(e.code === 'Enter'){



                let template = `
            
                <div>
                   <div class="to">
                       <div>${txt.value}</div>
                   </div>
                </div>
            
            `;


                feed.insertAdjacentHTML('beforeend',template);
                txt.value = '';


                feed.scrollTop = feed.scrollHeight;

            }


        })







    })();
});