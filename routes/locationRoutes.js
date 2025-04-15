const express = require('express');
const router = express.Router();
const locationController = require('../controllers/LocationController');

router.post('/update', locationController.updateLocation); // from driver
router.get('/current', locationController.getCurrentLocation); // to student

module.exports = router;