import mongoose from "mongoose";
import Booking from "./Booking";

const PastBookingSchema = new mongoose.Schema({
  ...Booking.schema.obj,
});

const PastBooking = mongoose.model("PastBooking", PastBookingSchema);
export default PastBooking;
