const http = require('https');
const replaceTemplate = require('../modules/replaceTemplate');
const dotenv = require('dotenv').config({ path: './config.env' });

//Check URL and create req param for location
exports.checkURL = (req, _, next) => {
  req.location = req.url.split('/')[2];
  next();
};

//Check Post through search bar and create req param for location
exports.checkPost = (req, _, next) => {
  req.location = req.body.location;
  next();
};

//no location passed through URL, default to user IP location
exports.getDefault = (_, res) => {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: `/current.json?q='Birmingham'`,
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
        res.end(replaceTemplate(JSON.parse(body.toString())));
      });
    })
    .end();
};

//location passed through search bar or directly into URL
exports.getSearch = (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: `/current.json?q=${req.location}`,
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
        if (response.hasOwnProperty('error')) {
          res.status(400).json({
            results: 'error',
            response: response.error.message,
          });
        } else {
          res.end(replaceTemplate(response));
        }
      });
    })
    .end();
};

exports.redirect = (_, res) => {
  res.redirect('/location');
};

// const http = require("https");

// const options = {
// 	"method": "GET",
// 	"hostname": "weatherapi-com.p.rapidapi.com",
// 	"port": null,
// 	"path": "/forecast.json?q=London&days=3",
// 	"headers": {
// 		"X-RapidAPI-Key": "6d82f956bamsh079341077b9577ep15f139jsnb77afa8ba2cf",
// 		"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
// 		"useQueryString": true
// 	}
// };

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on("data", function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on("end", function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();
