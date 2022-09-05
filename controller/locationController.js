const http = require('https');
const getWeatherData = require('./getWeatherData');
const replaceWeatherCard = require('../modules/replaceWeatherCard');
const replaceForecast = require('../modules/replaceForecast');
const { resolvePtr } = require('dns');

exports.getSearch = async (req, res) => {
  console.log(req.query);
  const response = await getWeatherData.getJSON(
    req,
    'https://weatherapi-com.p.rapidapi.com/current.json'
  );

  res.send(replaceWeatherCard(response));
};

//get 3 day forecastg
exports.getForecast = async (req, res) => {
  req.query.days = '3';
  const response = await getWeatherData.getJSON(
    req,
    'https://weatherapi-com.p.rapidapi.com/forecast.json'
  );

  res.send(replaceForecast(response));
};

exports.redirect = (_, res) => {
  res.redirect('/location?q=birmingham');
};
