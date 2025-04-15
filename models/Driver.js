const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  busRoute: { type: String, required: true }
});

module.exports = mongoose.model("Driver", driverSchema);
