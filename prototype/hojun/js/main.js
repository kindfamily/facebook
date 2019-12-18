const header = document.querySelector('#header');
const quick = document.querySelector('.quick');
const language = document.querySelector('.language');
const friends = document.querySelector('#friends');
const scroll = document.querySelector('.scroll');

function scrollFunc() {

  if(pageYOffset >= 10){
    // console.log(pageYOffset);
    header.classList.add('on');
    quick.classList.add('on');
    friends.classList.add('on');

  } else {
    header.classList.remove('on');
    quick.classList.remove('on');
    friends.classList.remove('on');
  }

  if(pageYOffset >= 563) {
    language.classList.add('on');
  } else {
    language.classList.remove('on');
  }
}

window.addEventListener('scroll', scrollFunc);
