let currentDriverLocation = null;

exports.updateLocation = (req, res) => {
  const { latitude, longitude } = req.body;
  currentDriverLocation = { latitude, longitude, timestamp: new Date() };
  res.status(200).json({ message: "Location updated", location: currentDriverLocation });
};

exports.getCurrentLocation = (req, res) => {
  if (currentDriverLocation) {
    res.json(currentDriverLocation);
  } else {
    res.status(404).json({ message: "No location available" });
  }
};
