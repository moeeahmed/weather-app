'use strict';

const inputField = document.querySelector('.location_input');
const errorMsg = document.querySelector('.error_msg');
const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
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

// console.log('Test DATA');

// (async function () {
//   const url = 'http://127.0.0.1:1234/fhusdilhfdskjhflo';
//   const mo = await fetch(url);
//   const moj = await mo.json();
//   console.log(moj);
// })();
