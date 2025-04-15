const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  busLine: { type: String, required: true },
  busStation: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
