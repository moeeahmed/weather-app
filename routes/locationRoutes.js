const express = require('express');
const locationController = require('../controller/locationController');

const router = express.Router();

router.param('loc', locationController.checkURL);

router.route('/').get(locationController.redirect);

router.route('/location/').get(locationController.getDefault);

router
  .route('/location/')
  .post(locationController.checkPost, locationController.getSearch);

router
  .route('/location/:loc')
  .get(locationController.checkURL, locationController.getSearch);

//Unrecognised URL
router.route('*').get(locationController.redirect);
module.exports = router;
