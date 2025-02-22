const express = require('express');
const router = express.Router();
const busStationController = require('../controllers/busstation');

const { body } = require('express-validator'); // For validation

const isAuth = require('../middleware/is-auth'); // Your authentication middleware

router.get('/busstations', busStationController.getBusStations);
router.get('/busstation/:busStationId', busStationController.getBusStation);
router.post('/busstation', busStationController.addBusStation);
router.patch('/busstation/:busStationId', busStationController.updateBusStation);
router.delete('/busstation/:busStationId', busStationController.deleteBusStation);

module.exports = router;