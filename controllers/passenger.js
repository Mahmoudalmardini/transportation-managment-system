const fs = require('fs');
const path = require('path');

// models/passenger.js (Model remains the same as in the previous response)
// ...

// controllers/passenger.js
const { validationResult } = require('express-validator');
const Passenger = require('../models/passenger');
const User = require('../models/user');

// GET all passengers (with pagination and population)
exports.getPassengers = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 10;
    let totalItems;

    try {
        const count = await Passenger.countDocuments();
        totalItems = count;

        const passengers = await Passenger.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            .populate('busRoute')
            .populate('busStation')
            .populate('creator', 'username email'); // Populate and select fields from creator

        res.status(200).json({
            message: 'Fetched Passengers',
            passengers: passengers,
            totalItems: totalItems
        });

    } catch (err) {
        next(err); // Pass errors to the error handling middleware
    }
};

// GET a single passenger (with population)
exports.getPassenger = async (req, res, next) => {
    const passengerId = req.params.passengerId;

    try {
        const passenger = await Passenger.findById(passengerId)
            .populate('busRoute')
            .populate('busStation')
            .populate('creator', 'username email'); // Populate and select fields

        if (!passenger) {
            const error = new Error('Passenger not found.');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Passenger fetched successfully!',
            passenger: passenger
        });

    } catch (err) {
        next(err);
    }
};

// POST a new passenger
exports.addPassenger = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed, entered data is incorrect.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        const { name, email, studentId, busRoute, busStation } = req.body;

        const passenger = new Passenger({
            name,
            email,
            studentId,
            busRoute,
            busStation,
            creator: req.userId // Make sure req.userId is set by your auth middleware
        });

        const savedPassenger = await passenger.save();

        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        user.passengers.push(savedPassenger._id);
        await user.save();

        const populatedPassenger = await Passenger.findById(savedPassenger._id)
            .populate('busRoute')
            .populate('busStation')
            .populate('creator', 'username email'); // Populate after saving

        res.status(201).json({
            message: 'Passenger added successfully!',
            passenger: populatedPassenger
        });

    } catch (err) {
        next(err);
    }
};

// PATCH (update) a passenger
exports.updatePassenger = async (req, res, next) => {
    const passengerId = req.params.passengerId;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { name, email, studentId, busRoute, busStation } = req.body;

    try {
        const passenger = await Passenger.findById(passengerId);

        if (!passenger) {
            const error = new Error('Could not find passenger.');
            error.statusCode = 404;
            throw error;
        }

        if (passenger.creator.toString() !== req.userId) { // Authorization check
            const error = new Error('Not Authorized.');
            error.statusCode = 403;
            throw error;
        }

        passenger.name = name;
        passenger.email = email;
        passenger.studentId = studentId;
        passenger.busRoute = busRoute;
        passenger.busStation = busStation;

        const updatedPassenger = await passenger.save();

        const populatedPassenger = await Passenger.findById(passengerId)
            .populate('busRoute')
            .populate('busStation')
            .populate('creator', 'username email'); // Populate after update

        res.status(200).json({
            message: 'Passenger updated!',
            passenger: populatedPassenger
        });

    } catch (err) {
        next(err);
    }
};

// DELETE a passenger
exports.deletePassenger = async (req, res, next) => {
    const passengerId = req.params.passengerId;

    try {
        const passenger = await Passenger.findById(passengerId);

        if (!passenger) {
            const error = new Error('Could not find passenger.');
            error.statusCode = 404;
            throw error;
        }

        if (passenger.creator.toString() !== req.userId) { // Authorization check
            const error = new Error('Not Authorized.');
            error.statusCode = 403;
            throw error;
        }

        await Passenger.findByIdAndDelete(passengerId);

        const user = await User.findById(req.userId);
        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        user.passengers.pull(passengerId);
        await user.save();

        res.status(200).json({ message: 'Deleted Passenger' });

    } catch (err) {
        next(err);
    }
};


module.exports = exports; // Important: Export the functions