const http = require('https');

const options = {
  method: 'GET',
  hostname: 'weatherapi-com.p.rapidapi.com',
  port: null,
  path: '/current.json?q=birmingham',
  headers: {
    'X-RapidAPI-Key': '6d82f956bamsh079341077b9577ep15f139jsnb77afa8ba2cf',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    useQueryString: true,
  },
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function () {
    const body = Buffer.concat(chunks);
    console.log(JSON.parse(body.toString()));
  });
});

req.end();
