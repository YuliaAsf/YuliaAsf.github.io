// Кнопка скрытия/показа контента в разделе "О компании"

const buttonAbout = document.querySelector('.about button');
const contentBlocks = document.querySelectorAll('.about p');
const contentElement = document.querySelector('.about span');

const mediaQueryMobile = window.matchMedia('(max-width: 767.9px)');

contentBlocks[2].style.display = 'none';
contentBlocks[3].style.display = 'none';

const mediaQueryTablet = window.matchMedia('(min-width: 768px)');

function handleTabletChange(evt) {
  if (evt.matches) {
    contentElement.style.display = 'block';
  } else {
    contentElement.style.display = 'none';
  }
}

mediaQueryTablet.addListener(handleTabletChange);
handleTabletChange(mediaQueryTablet);

for (let i = 0; i < contentBlocks.length; i++) {

  const hideContent = () => {
    contentBlocks[2].style.display = 'none';
    contentBlocks[3].style.display = 'none';
    buttonAbout.textContent = 'Подробнее';
  };

  const showContent = () => {
    contentBlocks[2].style.display = 'block';
    contentBlocks[3].style.display = 'block';
    buttonAbout.textContent = 'Cвернуть';
  };


  buttonAbout.addEventListener('click', ()=> {

    if (mediaQueryMobile.matches) {
      if (contentBlocks[i].classList.contains('hidden-mobile')) {
        contentBlocks[i].classList.remove('hidden-mobile');
        showContent();
        contentElement.style.display = 'block';
      } else {
        hideContent();
        contentBlocks[i].classList.add('hidden-mobile');
        contentElement.style.display = 'none';
      }
    }


    if (mediaQueryTablet.matches) {

      if (contentBlocks[i].classList.contains('hidden-tablet')) {
        showContent();
        contentBlocks[i].classList.remove('hidden-tablet');
      } else {
        hideContent();
        contentBlocks[i].classList.add('hidden-tablet');
      }
    }
  });
}


// Аккордеон в футере

const buttons = document.querySelectorAll('.page-footer__button');
const wrappers = document.querySelectorAll('.page-footer__wrapper-block');

for (let i = 0; i < wrappers.length; i++) {
  wrappers[i].classList.remove('nojs');
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', (evt) => {

    buttons.forEach((button) => {

      if (button !== evt.target) {
        button.classList.remove('page-footer__button--open');
        button.classList.add('page-footer__button--close');

        wrappers.forEach((element) => {
          element.classList.remove('opened');
          element.classList.add('closed');
        });
      }
    });

    if (buttons[i].classList.contains('page-footer__button--close')) {
      buttons[i].classList.remove('page-footer__button--close');
      buttons[i].classList.add('page-footer__button--open');
      wrappers[i].classList.remove('closed');
      wrappers[i].classList.add('opened');
    } else {
      buttons[i].classList.remove('page-footer__button--open');
      buttons[i].classList.add('page-footer__button--close');
      wrappers[i].classList.remove('opened');
      wrappers[i].classList.add('closed');
    }
  });
}

// Маска телефона

window.addEventListener('DOMContentLoaded', () => {
  [].forEach.call(document.querySelectorAll('#phone'), (input) => {
    let keyCode;
    function Mask(event) {
      let pos = this.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      let matrix = '+7(___)_______';
      let i = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      let newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return '\\d{1,' + a.length + '}';
          }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === 'blur' && this.value.length < 5) {
        this.value = '';
      }
    }
    input.addEventListener('input', Mask, false);
    input.addEventListener('focus', Mask, false);
    input.addEventListener('blur', Mask, false);
    input.addEventListener('keydown', Mask, false);
  });
});

// Local Storage
const formData = document.querySelectorAll('input');
for (let i = 0; i <= formData.length - 1; i++) {
  localStorage.setItem('formData', formData.value);
}

// Модальное окно
const orderButton = document.querySelector('.page-header button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__container > button');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.modal form');
const modalName = document.querySelector('#modal-name');

const openModal = () => {
  modal.classList.remove('modal--closed');
  modal.classList.add('modal--opened');
  orderButton.disabled = true;
  overlay.classList.remove('overlay--closed');
  overlay.classList.add('overlay--opened');
  modalName.focus();
};

const closeModal = ()=> {
  modal.classList.remove('modal--opened');
  modal.classList.add('modal--closed');
  overlay.classList.remove('overlay--opened');
  overlay.classList.add('overlay--closed');
  orderButton.disabled = false;
  form.reset();
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const onCloseModal = (evt) => {
  if (isEscapeKey(evt)) {
    closeModal();
  }
};

if (modal) {
  orderButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if (modal.classList.contains('modal--closed')) {
      openModal();
      document.addEventListener('keydown', onCloseModal);
    }
  });
}

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
  document.removeEventListener('keydown', onCloseModal);
});


overlay.addEventListener('click', (evt) => {
  if (!evt.target.closest('.modal')) { // если этот элемент или его родительские элементы не модальное окно
    closeModal();
  }
});

