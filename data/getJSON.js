const http = require('https');
const replaceTemplate = require('./../modules/replaceTemplate');
const dotenv = require('dotenv').config({ path: './config.env' });

module.exports = (location, res) => {
  const options = {
    method: 'GET',
    hostname: 'weatherapi-com.p.rapidapi.com',
    port: null,
    path: `/current.json?q=${location}`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      useQueryString: true,
    },
  };

  const callback = (resp) => {
    const chunks = [];

    resp.on('data', function (chunk) {
      chunks.push(chunk);
    });

    resp.on('end', function () {
      const body = Buffer.concat(chunks);
      res.end(replaceTemplate(JSON.parse(body.toString())));
    });
  };

  http.request(options, callback).end();

  return { shad: 'ds' };
};
