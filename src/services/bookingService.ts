import Table from "../models/Table";
import Booking from "../models/Booking";

const bookTable = async (bookingData: any) => {
  const {
    tableNumber,
    tableType,
    tablePrice,
    numberOfChairs,
    date,
    startTime,
    endTime,
    firstName,
    lastName,
    phoneNumber,
    numberOfPeople,
    address,
    cartItems,
  } = bookingData;

  // Check table availability
  const isAvailable = await checkAvailability(
    tableNumber,
    date,
    startTime,
    endTime
  );
  if (!isAvailable) {
    return {
      success: false,
      message: "The table is not available during the selected time range.",
    };
  }

  // Proceed with booking if available
  const booking = new Booking({
    tableNumber,
    tableType,
    tablePrice,
    numberOfChairs,
    stableStatus: "Seated",
    date,
    startTime,
    endTime,
    firstName,
    lastName,
    phoneNumber,
    numberOfPeople,
    address,
    cartItems,
    isConfirmed: false,
  });

  await booking.save();

  // Update the table status to 'Seated'
  const table = await Table.findOne({ id: tableNumber });
  if (table) {
    table.status = "Seated"; // Mark table as seated
    await table.save();

    // Revert to 'Available' if unconfirmed after 2 minutes
    setTimeout(async () => {
      const refreshedBooking = await Booking.findById(booking._id);
      if (!refreshedBooking?.isConfirmed) {
        table.status = "Available";
        await table.save();
        await Booking.findByIdAndDelete(booking._id); // Delete unconfirmed booking
      }
    }, 2 * 60 * 1000); // 2 minutes

    return {
      success: true,
      booking,
      message: "Booking successfully placed!",
    };
  } else {
    return {
      success: false,
      message: "Table not found.",
    };
  }
};

const checkAvailability = async (
  tableNumber: number,
  date: string,
  startTime: string,
  endTime: string
) => {
  const table = await Table.findOne({ id: tableNumber });
  if (!table) throw new Error("Table not found");

  // Find any bookings that conflict with the requested time range
  const conflictingBookings = await Booking.find({
    tableNumber,
    date,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Conflicting time
    ],
  });

  // If conflicting bookings exist, return false (not available)
  return conflictingBookings.length === 0;
};

export default { bookTable, checkAvailability };
