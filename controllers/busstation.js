const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Passenger = require('../models/passenger');
const Bus = require('../models/bus');
const BusRoute = require('../models/busroute');
const BusStation = require('../models/busstation');
const mongoose = require('mongoose');

exports.getBusStations = async (req, res, next) => {
    try {
        const busStations = await BusStation.find();
        res.status(200).json({ busStations });
    } catch (err) {
        next(err);
    }
};

exports.getBusStation = async (req, res, next) => {
    const busStationId = req.params.busStationId;
    try {
        const busStation = await BusStation.findById(busStationId);
        if (!busStation) {
            return res.status(404).json({ message: 'Bus station not found' });
        }
        res.status(200).json({ busStation });
    } catch (err) {
        next(err);
    }
};

exports.addBusStation = async (req, res, next) => {
    const busStation = new BusStation(req.body);
    try {
        const newBusStation = await busStation.save();
        res.status(201).json({ busStation: newBusStation });
    } catch (err) {
        next(err);
    }
};

exports.updateBusStation = async (req, res, next) => {
    const busStationId = req.params.busStationId;
    try {
        const updatedBusStation = await BusStation.findByIdAndUpdate(busStationId, req.body, { new: true, runValidators: true }); //runValidators added
        if (!updatedBusStation) {
            return res.status(404).json({ message: 'Bus station not found' });
        }
        res.status(200).json({ busStation: updatedBusStation });
    } catch (err) {
        next(err);
    }
};

exports.deleteBusStation = async (req, res, next) => {
    const busStationId = req.params.busStationId;
    try {
        const result = await BusStation.findByIdAndDelete(busStationId);
        if (!result) {
            return res.status(404).json({ message: 'Bus station not found' });
        }
        res.status(200).json({ message: 'Bus station deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = exports; // Important: Export the functions