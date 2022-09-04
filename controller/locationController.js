const http = require('https');
const replaceWeatherCard = require('../modules/replaceWeatherCard');
const replaceForecast = require('../modules/replaceForecast');
const dotenv = require('dotenv').config({ path: './config.env' });

//Check URL and create req param for location
// exports.checkURL = (req, _, next) => {
//   console.log(req.query.q);
//   req.location = req.query.q;
//   next();
// };

//Check Post through search bar and create req param for location
// exports.checkPost = (req, _, next) => {
//   req.location = req.body.location;
//   next();
// };

//no location passed through URL, default to user IP location
// exports.getDefault = (_, res) => {
//   const options = {
//     method: 'GET',
//     hostname: 'weatherapi-com.p.rapidapi.com',
//     port: null,
//     path: `/current.json?q='Birmingham'`,
//     headers: {
//       'X-RapidAPI-Key': process.env.API_KEY,
//       'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
//       useQueryString: true,
//     },
//   };
//   http
//     .request(options, (resp) => {
//       const chunks = [];
//       resp.on('data', function (chunk) {
//         chunks.push(chunk);
//       });
//       resp.on('end', function () {
//         const body = Buffer.concat(chunks);
//         const response = JSON.parse(body.toString());
//         res.end(replaceWeatherCard(response));
//       });
//     })
//     .end();
// };

//location passed through search bar or directly into URL
exports.getSearch = (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: `/current.json?q=${req.query.q}`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      useQueryString: true,
    },
  };
  http
    .request(options, (resp) => {
      const chunks = [];
      resp.on('data', function (chunk) {
        chunks.push(chunk);
      });

      resp.on('end', function () {
        const body = Buffer.concat(chunks);
        const response = JSON.parse(body.toString());
        console.log(response);
        if (response.hasOwnProperty('error')) {
          res.status(400).json({
            results: 'error',
            response: response.error.message,
          });
        } else {
          res.end(replaceWeatherCard(response));
        }
      });
    })
    .end();
};

//get 3 day forecast
exports.getForecast = (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: `/forecast.json?q=${req.query.q}&days=3`,
    headers: {
      'X-RapidAPI-Key': '6d82f956bamsh079341077b9577ep15f139jsnb77afa8ba2cf',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      useQueryString: true,
    },
  };

  http
    .request(options, function (resp) {
      const chunks = [];

      resp.on('data', function (chunk) {
        chunks.push(chunk);
      });

      resp.on('end', function () {
        const body = Buffer.concat(chunks);
        const response = JSON.parse(body.toString());
        res.end(replaceForecast(response));
      });
    })
    .end();
};

exports.redirect = (_, res) => {
  res.redirect('/location?q=birmingham');
};
