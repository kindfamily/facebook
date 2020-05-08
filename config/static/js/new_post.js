window.addEventListener('DOMContentLoaded',function () {

    const createBox = document.querySelector('.create_box');
    const textField = document.querySelector('#text_field');
    const fileInput  = document.querySelector( "#id_photo" );
    const submit  = document.querySelector( "#submitBtn" );

    // Show image
    let canvas = document.getElementById('imageCanvas');
    let ctx = canvas.getContext('2d');


    let reader = new FileReader();



    function handleImage(e){
        let reader = new FileReader();
        submit.disabled = false;

        console.log(reader.readAsDataURL);

        reader.onload = function(event){
            console.log(event);

            let img = new Image();

            img.onload = function(){
                canvas.width = 100;
                canvas.height = 100;
                ctx.drawImage(img,0,0,100,100);

                submit.parentNode.style.display = 'block';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }

    function handleNewPostSubmit(e) {
        e.preventDefault();
        
        const csrf_token = document.querySelector('#csrfmiddlewaretoken').value;

        const form = document.getElementById('form_new_post');
        const post_data = new FormData(form);

        $.ajax({
            type: 'POST',
            url: '/post/new',
            data: post_data,
            processData: false,
            contentType: false,
            success: function (response){
                $(".contents_wrapper").prepend($(response));
                clear_new_post_form();
            },
            error: function (request, status, error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }

    function clear_new_post_form() {
        const form = document.getElementById('form_new_post');
        form.photo.value = "";
        form.content.value = "";

        const canvas = document.getElementById('imageCanvas');
        canvas.width = 0;
        canvas.height = 0;

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    fileInput.addEventListener('change', handleImage, false);
    submit.addEventListener('click', handleNewPostSubmit, false);
});