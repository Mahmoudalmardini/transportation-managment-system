const BusLine = require("../models/BusLine");

// Get all bus lines
exports.getBusLines = async (req, res) => {
  try {
    const busLines = await BusLine.find();
    res.json(busLines);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new bus line
exports.addBusLine = async (req, res) => {
  const { name } = req.body;
  try {
    const newBusLine = new BusLine({ name, stations: [] });
    await newBusLine.save();
    res.status(201).json(newBusLine);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a bus line
exports.deleteBusLine = async (req, res) => {
  try {
    await BusLine.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus line deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// Add a station to a bus line
exports.addStation = async (req, res) => {
  const { station } = req.body;
  try {
    const busLine = await BusLine.findById(req.params.id);

    if (!busLine) {
      return res.status(404).json({ message: "Bus line not found" });
    }

    // Append the new station instead of overwriting
    busLine.stations.push(station);
    await busLine.save();

    res.json(busLine);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

