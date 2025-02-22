const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    driverName: { // Driver's name
        type: String,
        required: true,
        trim: true
    },
    busRoute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
        required: true
    },
    currentLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
            required: true
        }
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }]
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;