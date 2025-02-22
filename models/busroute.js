const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude] - Important: GeoJSON convention
            index: '2dsphere'
        }
    },
    destination: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude] - Important: GeoJSON convention
            index: '2dsphere'
        }
    },
    stations: [{
        station: {type: mongoose.Schema.Types.ObjectId, ref: 'BusStation'},
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [longitude, latitude] - Important: GeoJSON convention
                index: '2dsphere'
            }
        }
    }],
    buses: [{ // Added buses array for easier querying
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }]
}, { timestamps: true });


const BusRoute = mongoose.model('BusRoute', busRouteSchema);

module.exports = BusRoute;