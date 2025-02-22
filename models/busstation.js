const mongoose = require('mongoose');

const busStationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

const BusStation = mongoose.model('BusStation', busStationSchema);

module.exports = BusStation;