'use strict';

//Weather Card
const inputField = document.querySelector('.location_input');
const errorMsg = document.querySelector('.error_msg');
const form = document.querySelector('.form');

//Forecast Card
const info = document.querySelectorAll('.info');
const forecastCards = document.querySelectorAll('.card');

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~¬]/;

  if (inputField.value === '') {
    errorMsg.classList.remove('hide');
    errorMsg.textContent = 'Search bar cannot be empty';
  } else if (specialChar.test(inputField.value)) {
    errorMsg.classList.remove('hide');
    errorMsg.textContent = 'Enter a valid location';
  } else {
    this.submit();
  }
});

//Forecast Cards
info.forEach((el, ind) => {
  if (ind === 0) {
    el.children[0].textContent = 'Today';
  } else if (ind === 1) {
    el.children[0].textContent = 'Tomorrow';
  } else {
    el.children[0].textContent = Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
    }).format(new Date(el.children[0].textContent));
  }
});

forecastCards[1].style.transform = 'scale(0.9)';
forecastCards[2].style.transform = 'scale(0.9)';

document.addEventListener('click', function (e) {
  if (e.target.closest('.card')) {
    forecastCards.forEach((el) => (el.style.transform = 'scale(0.9)'));
    e.target.closest('.card').style.transform = 'scale(1)';
  }
});
