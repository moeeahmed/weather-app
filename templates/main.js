'use strict';

const inputField = document.querySelector('#team_name');
const form = document.querySelector('.form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (inputField.value === '') {
    const html = `
    <div class="error_msg">
        Seach bar cannot be empty
    </div>
    `;
    form.insertAdjacentHTML('beforebegin', html);
    console.log('Please enter a location');
  } else {
    this.submit();
  }
});
