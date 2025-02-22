const express = require('express');

const { body } = require('express-validator'); 
const busController = require('../controllers/bus');

const isAuth = require('../middleware/is-auth');//

const router = express.Router();

// Get all buses
router.get('/buses', busController.getBuses);

// POST /passenger
router.post( '/bus', busController.addBus);

// Get a single bus by ID
router.get('/bus/:busId', busController.getBus);
    
router.put('/bus/:busId',isAuth, busController.updateBus);//update info about the bus

// Delete a bus
router.delete('/bus/:busId', busController.deleteBus);

module.exports = router;