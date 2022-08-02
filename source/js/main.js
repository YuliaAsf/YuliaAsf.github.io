const button = document.querySelector('.page-header button');
const container = document.querySelector('.page-header__wrapper');
const link = document.querySelectorAll('.page-header__navigation a');
const body = document.querySelector('body');

container.classList.remove('page-header__menu-nojs');

button.addEventListener('click', ()=> {
  if (container.classList.contains('page-header__menu-closed')) {
    container.classList.remove('page-header__menu-closed');
    container.classList.add('page-header__menu-opened');
    body.classList.add('no-scrolling');
  } else {
    container.classList.remove('page-header__menu-opened');
    container.classList.add('page-header__menu-closed');
    body.classList.remove('no-scrolling');
  }
});

for (let i = 0; i <= link.length - 1; i++) {
  link[i].addEventListener('click', ()=> {

    if (container.classList.contains('page-header__menu-opened')) {
      container.classList.remove('page-header__menu-opened');
      container.classList.add('page-header__menu-closed');
      body.classList.remove('no-scrolling');
    }
  });
}

