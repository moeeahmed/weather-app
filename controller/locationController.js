const getWeatherData = require('./getWeatherData');
const replaceWeatherCard = require('../modules/replaceWeatherCard');
const replaceForecast = require('../modules/replaceForecast');

exports.getSearch = async (req, res) => {
  const resp = await getWeatherData.getJSON(
    req,
    'https://weatherapi-com.p.rapidapi.com/current.json'
  );

  res
    .status(resp.status)
    .send(
      resp.status === 200 ? replaceWeatherCard(resp.data) : resp.error.message
    );
};

//get 3 day forecastg
exports.getForecast = async (req, res) => {
  req.query.days = '3';
  const resp = await getWeatherData.getJSON(
    req,
    'https://weatherapi-com.p.rapidapi.com/forecast.json'
  );

  res
    .status(resp.status)
    .send(
      resp.status === 200 ? replaceForecast(resp.data) : resp.error.message
    );
};

exports.redirect = (_, res) => {
  res.redirect('/location?q=birmingham');
};
