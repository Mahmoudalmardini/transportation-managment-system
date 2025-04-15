const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin"); // Adjust the path to your Admin model

// Load environment variables
require("dotenv").config();

const createAdmin = async () => {
  const email = "admin@example.com";
  const password = "admin123";

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the admin user
  const admin = new Admin({
    email,
    password: hashedPassword,
  });

  // Save the admin user to the database
  await admin.save();
  console.log("Admin user created successfully");
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    createAdmin();
  })
  .catch((err) => console.error("MongoDB connection error:", err));