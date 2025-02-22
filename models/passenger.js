const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    studentId: { // This is now always required
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    busRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute'
    },
    busStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusStation'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;