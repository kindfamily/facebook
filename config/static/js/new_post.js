

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



    fileInput.addEventListener('change', handleImage, false);

});