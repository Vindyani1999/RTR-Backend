import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import menuItemRoutes from "./routes/menuItemRoutes";
import bookingRoutes from "./routes/bookingRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuItemRoutes);

// MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
