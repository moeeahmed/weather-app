const axios = require('axios');

exports.getJSON = (query, url) => {
  let options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };
  options.params = query;
  options.url = url;

  return axios
    .request(options)
    .then((resp) => {
      return {
        status: resp.status,
        data: resp.data,
      };
    })
    .catch((err) => {
      return {
        status: err.response.status,
        error: err.response.data.error,
      };
    });
};
