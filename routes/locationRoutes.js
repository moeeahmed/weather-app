const express = require('express');
const router = express.Router();
const getJSON = require('./../data/getJSON');

// router.route('/location=:loc?', (req, res) => {
//   if (req.url === '/favicon.ico') {
//     return res.end();
//   } else if (req.url.includes('/main.js')) {
//     fs.readFile(`${__dirname}/templates/main.js`, function (err, data) {
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error loading index.html');
//       }
//       res.setHeader('content-type', 'text/javascript');
//       res.writeHead(200);
//       res.end(data);
//     });
//   } else if (req.url.includes('/location=') || req.params.loc) {
//     let location = req.url.includes('/?location')
//       ? req.url.split('=')[1]
//       : req.params.loc
//       ? req.params.loc
//       : 'birmingham';

//   }
// });

const test = (req, res) => {
  console.log(getJSON('utah', res));
};

router.route('/').get(test);

module.exports = router;
