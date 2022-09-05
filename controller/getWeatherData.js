const axios = require('axios');
const dotenv = require('dotenv').config({ path: './config.env' });

let options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  },
};

exports.getJSON = (req, url) => {
  options.params = req.query;
  options.url = url;

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
};
