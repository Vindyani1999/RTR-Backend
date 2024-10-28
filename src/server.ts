import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import menuItemRoutes from "./routes/menuItemRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import pastBookingRoutes from "./routes/pastBookingRoutes";
import tableRoutes from "./routes/tableRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes

app.use("/api/bookings", bookingRoutes);
app.use("/api/menu", menuItemRoutes);
app.use("/api/history", pastBookingRoutes);
app.use("/api/table", tableRoutes);

// MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
