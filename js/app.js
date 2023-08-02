let elForm = document.querySelector('.js-form');
let elInp = document.querySelector('.js-input');
let elInpTime = document.querySelector('.js-time');
let elBtn = document.querySelector('.js-btn');
let elList = document.querySelector('.wrapper__list');
let clrBtn = document.querySelector('.js-clear');
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
  console.log(elList.childNodes.length);

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let inpVal = elInp.value;
  let inpTimeVal = elInpTime.value;
  let elLi = document.createElement('li');
  let elp = document.createElement('p');
  let elLiBtn = document.createElement('button');
  let elTime = document.createElement('time');
  elLi.classList.add('wrapper__item');
  elp.classList.add('item__desc');
  elp.innerHTML = inpVal;
  elTime.classList.add('item__time');
  elTime.innerHTML = inpTimeVal;
  elp.appendChild(elTime);
  elLiBtn.classList.add('item__btn');
  elLiBtn.innerHTML = "&times;";
  elLi.appendChild(elp);
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
});

elList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('item__desc') || evt.target.classList.contains('item__time')) {
    if(!evt.target.classList.contains('item__time')) {
       evt.target.parentElement.classList.toggle('wrapper__item--active');
       evt.target.classList.toggle('item__desc--active');
    }else {
       evt.target.closest('.wrapper__item').classList.toggle('wrapper__item--active');
       evt.target.parentElement.classList.toggle('item__desc--active');
    }
    
  }
  if (evt.target.classList.contains('item__btn')) {
    evt.target.parentElement.remove();
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