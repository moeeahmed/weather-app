const express = require('express');
const locationController = require('../controller/locationController');

const router = express.Router();

// router.param('loc', locationController.checkURL);

router.route('/').get(locationController.redirect);

router.route('/location/').get(locationController.getSearch);

// router
//   .route('/location?(q=:loc)')
//   .get(locationController.checkURL, locationController.getSearch);

router.route('/forecast').get(locationController.getForecast);

//Unrecognised URL
router.route('*').get(locationController.redirect);
module.exports = router;
