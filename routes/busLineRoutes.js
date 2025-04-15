const express = require("express");
const {
  getBusLines,
  addBusLine,
  deleteBusLine,
  addStation,
} = require("../controllers/busLineController");
const router = express.Router();

router.get("/", getBusLines);
router.post("/", addBusLine);
router.delete("/:id", deleteBusLine);
router.put("/:id/stations", addStation);

module.exports = router;