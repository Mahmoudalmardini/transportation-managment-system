const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app); // Use the server created from app
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your client URL(s)
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Socket.IO logic (single connection handler)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // When driver sends location, broadcast it to all connected students
  socket.on("driverLocation", (location) => {
    console.log("Received driver location:", location);
    io.emit("locationUpdate", location);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Your other routes (students, buslines, etc.)
const locationRoutes = require('./routes/locationRoutes');
const studentRoutes = require("./routes/studentRoutes");
const busLineRoutes = require("./routes/busLineRoutes");
const driverRoutes = require("./routes/driverRoutes");
const authRoutes = require('./routes/authRoutes');

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/buslines", busLineRoutes);
app.use("/api/drivers", driverRoutes);
app.use('/api/location', locationRoutes);

// Error-handling middleware...
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({ message: error.message });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server using the 'server' object
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
