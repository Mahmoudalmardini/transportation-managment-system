const Driver = require("../models/Driver");

// ✅ Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
};

// ✅ Add a new driver
exports.addDriver = async (req, res) => {
  try {
    const { name, capacity, busRoute } = req.body;
    const newDriver = new Driver({ name, capacity, busRoute });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: "Failed to add driver" });
  }
};

// ✅ Update a driver
exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDriver = await Driver.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: "Failed to update driver" });
  }
};

// ✅ Delete a driver
exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    await Driver.findByIdAndDelete(id);
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete driver" });
  }
};
