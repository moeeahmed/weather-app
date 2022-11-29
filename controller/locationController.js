const getWeatherData = require('./getWeatherData');

exports.getSearch = async (req, res) => {
  const resp = await getWeatherData.getJSON(
    req.query,
    'https://weatherapi-com.p.rapidapi.com/current.json'
  );

  console.log(resp);

  res.status(200).render('weatherCard', resp);
};

//get 3 day forecastg
exports.getForecast = async (req, res) => {
  req.query.days = '3';
  const resp = await getWeatherData.getJSON(
    req.query,
    'https://weatherapi-com.p.rapidapi.com/forecast.json'
  );

  res.status(200).render('forecast', resp);
};

exports.redirect = (_, res) => {
  res.redirect('/location?q=birmingham');
};
