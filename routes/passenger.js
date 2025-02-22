// routes/passengers.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // For validation
const passengerController = require('../controllers/passenger'); // Path to your controller
const isAuth = require('../middleware/is-auth'); // Your authentication middleware

// GET all passengers
router.get('/passengers', passengerController.getPassengers); // Protect the route

// GET a single passenger
router.get('/passenger/:passengerId', passengerController.getPassenger); // Protect the route

// POST a new passenger (with validation)
router.post('/passenger', [ // Protect and validate
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('studentId').trim().notEmpty().withMessage('Student ID is required'), // Validate studentId
    body('busRoute').notEmpty().withMessage('Bus Route is required'),
    body('busStation').notEmpty().withMessage('Bus Station is required')
], passengerController.addPassenger);

// PATCH (update) a passenger (with validation)
router.patch('/passenger/:passengerId',[ // Protect and validate
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('studentId').trim().notEmpty().withMessage('Student ID is required'), // Validate studentId
    body('busRoute').notEmpty().withMessage('Bus Route is required'),
    body('busStation').notEmpty().withMessage('Bus Station is required')
], passengerController.updatePassenger);

// DELETE a passenger
router.delete('/passenger/:passengerId',passengerController.deletePassenger); // Protect the route

module.exports = router;