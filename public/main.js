'use strict';

//Weather Card
const inputField = document.querySelector('.location_input');
const errorMsg = document.querySelector('.error_msg');
const form = document.querySelector('.form');

//Forecast Card
const date = document.querySelectorAll('.date');
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
date.forEach((el, ind) => {
  if (ind === 0) {
    el.textContent = 'Today';
  } else if (ind === 1) {
    el.textContent = 'Tomorrow';
  } else {
    el.textContent = Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
    }).format(new Date(el.textContent));
  }
});

if (forecastCards.length > 1) {
  forecastCards[0].classList.add('active');
}

document.addEventListener('click', function (e) {
  if (e.target.closest('.card')) {
    forecastCards.forEach((el) => el.classList.remove('active'));
    e.target.closest('.card').classList.add('active');
  }
});

document.querySelector('.forecast_icon').children[0].href += `?q=${
  window.location.href.split('=')[1]
}`;

const getHourForecast = function () {
  const hour = new Date().getHours();
  const hourElement = document.querySelector('.hourly').children[hour];

  // document
  //   .querySelectorAll('.hourly')
  //   .forEach((el) => (el.style.background = 'none'));

  // hourElement.style.background = 'rgba(255, 255, 255, 0.2)';

  hourElement.scrollIntoView(true, {
    behavior: 'auto',
    block: 'center',
    inline: 'center',
  });
};

setInterval(getHourForecast, 1000);
