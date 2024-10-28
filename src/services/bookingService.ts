import Booking, { BookingDocument } from "../models/Booking";
import Table from "../models/Table";
import PastBooking from "../models/PastBooking";

export const createBooking = async (
  bookingData: Partial<BookingDocument>
): Promise<BookingDocument> => {
  // Check for overlapping bookings
  const overlappingBooking = await Booking.findOne({
    tableNumber: bookingData.tableNumber,
    date: bookingData.date,
    $or: [
      {
        startTime: { $lt: bookingData.endTime },
        endTime: { $gt: bookingData.startTime },
      },
    ],
  });

  if (overlappingBooking) {
    throw new Error("Table is already booked during the selected time.");
  }

  // Update the table's status to "Seated"
  await Table.updateOne(
    { tableNumber: bookingData.tableNumber },
    { status: "Seated" }
  );

  // Save the new booking
  const newBooking = new Booking({ ...bookingData, isConfirmed: true });
  await newBooking.save();

  return newBooking;
};

export const updateExpiredBookings = async () => {
  const currentTime = new Date();
  const expiredBookings = await Booking.find({
    endTime: { $lte: currentTime.toISOString() },
  });

  for (const booking of expiredBookings) {
    // Move to past booking
    await PastBooking.create(booking.toObject());

    // Reset the table status to "Available"
    await Table.updateOne(
      { tableNumber: booking.tableNumber },
      { status: "Available" }
    );

    // Remove from current bookings
    await Booking.deleteOne({ _id: booking._id });
  }
};

export const getAllBookingsService = async () => {
  try {
    const bookings = await Booking.find();
    return bookings;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching bookings: " + error.message);
    } else {
      throw new Error("Error fetching bookings: " + String(error));
    }
  }
};
