const mongoose = require("mongoose");

const busLineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  stations: [{ type: String }],
});

module.exports = mongoose.model("BusLine", busLineSchema);
