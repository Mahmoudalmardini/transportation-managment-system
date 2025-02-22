const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Passenger = require('../models/passenger');
const Bus = require('../models/bus');
const BusRoute = require('../models/busroute');
const BusStation = require('../models/busstation');
const mongoose = require('mongoose');

exports.addBus = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    const { busNumber, capacity, driverName, busRoute, currentLocation} = req.body;

    try {
        const bus = new Bus({
            busNumber,
            capacity,
            driverName,
            busRoute,
            currentLocation
        });
        const result = await bus.save();
        res.status(201).json({ message: 'Bus created!', bus: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBus = async (req, res, next) => {
    const busId = req.params.busId;
    try {
        const bus = await Bus.findById(busId).populate('busRoute').populate('passengers');
        if (!bus) {
            const error = new Error('Could not find bus.');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({ message: 'Bus fetched.', bus: bus });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateBus = async (req, res, next) => {
    const busId = req.params.busId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }

    const { busNumber, capacity, driverName, busRoute, currentLocation} = req.body;
    try {
        const bus = await Bus.findById(busId);
        if (!bus) {
            const error = new Error('Could not find bus.');
            error.statusCode = 404;
            return next(error);
        }
        if (busRoute && !mongoose.Types.ObjectId.isValid(assignedRoute)) {
            const error = new Error('Invalid assignedRoute.');
            error.statusCode = 422;
            return next(error);
        }
        bus.busNumber = busNumber;
        bus.capacity = capacity;
        bus.driverName = driverName;
        bus.busRoute = busRoute;
        bus.currentLocation = currentLocation;
        //bus.status = status;
        const result = await bus.save();
        res.status(200).json({ message: 'Bus updated!', bus: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteBus = async (req, res, next) => {
    const busId = req.params.busId;
    try {
        const bus = await Bus.findById(busId);
        if (!bus) {
            const error = new Error('Could not find bus.');
            error.statusCode = 404;
            return next(error);
        }
        
        await Bus.findByIdAndDelete(busId);
        res.status(200).json({ message: 'Bus deleted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBuses = async (req, res, next) => {
    try {
        const buses = await Bus.find().populate('busRoute');
        res.status(200).json({ message: 'Fetched buses successfully.', buses: buses });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

module.exports = exports; // Important: Export the functions