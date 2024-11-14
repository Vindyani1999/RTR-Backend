// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db";
// import menuItemRoutes from "./routes/menuItemRoutes";
// import bookingRoutes from "./routes/bookingRoutes";
// import pastBookingRoutes from "./routes/pastBookingRoutes";
// import tableRoutes from "./routes/tableRoutes";
// import cron from "node-cron";
// import { updateExpiredBookings } from "./services/bookingService";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5002;

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/menu", menuItemRoutes);
// app.use("/api/history", pastBookingRoutes);
// app.use("/api/table", tableRoutes);

// cron.schedule("* * * * *", async () => {
//   try {
//     await updateExpiredBookings();
//   } catch (error) {
//     console.error("Error updating expired bookings:", error);
//   }
// });

// // MongoDB connection
// connectDB();

// app.listen(PORT, () => {
//   console.log(`Booking Service running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db"; // Assuming this still needs to be included for database connection
import menuItemRoutes from "./routes/menuItemRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import pastBookingRoutes from "./routes/pastBookingRoutes";
import tableRoutes from "./routes/tableRoutes"; // Import your authentication routes

// Load environment variables from .env file
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB connection
connectDB();

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/history", pastBookingRoutes);
app.use("/api/table", tableRoutes);

// Test route for checking if the server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Listen on a port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB (optional if connectDB is already handling it)
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));
