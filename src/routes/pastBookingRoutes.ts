// routes/bookingRoutes.ts
import express from "express";
import { getAllPastBookings } from "../controllers/pastBookingController";

const router = express.Router();

// Route for fetching all past bookings
router.get("/all", getAllPastBookings);

export default router;
