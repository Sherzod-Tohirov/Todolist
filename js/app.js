let elForm = document.querySelector('.js-form');
let elInp = document.querySelector('.js-input');
let elInpTime = document.querySelector('.js-time');
let elBtn = document.querySelector('.js-btn');
let elList = document.querySelector('.wrapper__list');
let clrBtn = document.querySelector('.js-clear');
const elMicBtn = document.querySelector('.js-mic-btn');
const elMicImg = document.querySelector('.js-mic-img');
const webkitSpeech = new webkitSpeechRecognition();
if (localStorage.getItem('items')) {
  let liVal = localStorage.getItem('items');
  elList.innerHTML = liVal;
  clrBtn.style.display = 'flex';
}
elInp.addEventListener('input', (evt) => {
  check(elInp, elInpTime, elBtn);
});

elInpTime.addEventListener('input', (evt) => {
  check(elInpTime, elInp, elBtn);
});

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addToDo(elInp.value, elInpTime.value);
});

elList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('item__desc') || evt.target.classList.contains('item__time')) {
    if (!evt.target.classList.contains('item__time')) {
      evt.target.parentElement.classList.toggle('wrapper__item--active');
      evt.target.classList.toggle('item__desc--active');
    } else {
      evt.target.closest('.wrapper__item').classList.toggle('wrapper__item--active');
      evt.target.parentElement.classList.toggle('item__desc--active');
    }

  }
  if (evt.target.classList.contains('item__btn')) {
    evt.target.parentElement.remove();
  }

  if (evt.target.classList.contains('item__edit-btn')) {
    let todo = prompt('Enter to do: ');
    let time = prompt('Enter time: ');
    
    if(todo && time) {
      evt.target.offsetParent.childNodes[0].innerHTML = todo + `<time class="item__time"> ${time} </time>`;
    }else {
      console.log('Something went wrong !');
    }
  }

  if (elList.childNodes.length == 0) {
    clrBtn.style.display = 'none';
  } else {
    clrBtn.style.display = 'flex';
  }

  localStorage.setItem('items', elList.innerHTML);

});


clrBtn.addEventListener('click', (evt) => {
  elList.innerHTML = '';
  if (localStorage.getItem('items')) {
    localStorage.removeItem('items');
  }

  evt.target.remove();
});


elMicBtn.addEventListener('click', (evt) => {
  webkitSpeech.start();

  webkitSpeech.onresult = (evt) => {
    let val = evt.results[0][0].transcript;
    if (val.length > 0 || val !== undefined) {
      let todo = val.substr(0, val.indexOf('at'));
      let time = val.substr(val.indexOf('at') + 2);
      if (time.length > 0) {
        if (todo && time) {
          addToDo(todo, time);
        } else {
          console.log("Something went wrong !");
        }
      }
    }
  }

  webkitSpeech.onstart = (evt) => {
    elMicImg.classList.add('wrapper__img--active');
  }


  webkitSpeech.onend = (evt) => {
    elMicImg.classList.remove('wrapper__img--active');
  }

});




function check(element, second_element, btn_element) {
  if (element.value.length == 0 || (/^\s/.test(element.value) || second_element.value.length == 0)) {
    btn_element.style.backgroundColor = 'gray';
    btn_element.setAttribute('disabled', '');
    btn_element.setAttribute('disabled', '');
  } else {
    btn_element.style.backgroundColor = 'rgb(255, 100, 60)';
    btn_element.removeAttribute('disabled');
  }
}

function addToDo(inp, time) {
  let elLi = document.createElement('li');
  let elp = document.createElement('p');
  let elLiBtn = document.createElement('button');
  let elTime = document.createElement('time');
  let editBtn = document.createElement('button');
  editBtn.classList.add('item__edit-btn');
  elLi.classList.add('wrapper__item');
  elp.classList.add('item__desc');
  elp.innerHTML = inp;
  elTime.classList.add('item__time');
  elTime.innerHTML = time;
  elp.appendChild(elTime);
  elLiBtn.classList.add('item__btn');
  elLi.appendChild(elp);
  elLi.appendChild(editBtn);
  elLi.appendChild(elLiBtn);
  elList.appendChild(elLi)
  elInp.value = '';
  elInpTime.value = '';
  elBtn.style.backgroundColor = 'gray';
  elBtn.setAttribute('disabled', '');
  localStorage.setItem('items', elList.innerHTML);
  if (elList.childNodes.length == 0) {
    clrBtn.style.display = 'none';
  } else {
    clrBtn.style.display = 'flex';
  }
}