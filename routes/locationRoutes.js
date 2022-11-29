const express = require('express');
const locationController = require('../controller/locationController');

const router = express.Router();

router.route('/').get(locationController.redirect);

router.route('/location').get(locationController.getSearch);

router.route('/forecast').get(locationController.getForecast);

module.exports = router;
