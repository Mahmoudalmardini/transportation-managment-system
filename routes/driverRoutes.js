const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

// API endpoints
router.get("/", driverController.getDrivers);
router.post("/", driverController.addDriver);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;
