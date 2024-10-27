import Table from "../models/Table";
import Booking from "../models/Booking";
import PastBooking from "../models/PastBooking";

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
    tableStatus: "Available", // Initially available before time
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

  const table = await Table.findOne({ id: tableNumber });
  if (table) {
    const currentTime = Date.now();
    const bookingStartTime = new Date(`${date}T${startTime}`).getTime();
    const bookingEndTime = new Date(`${date}T${endTime}`).getTime();
    const fiveMinutesBeforeStart = bookingStartTime - 5 * 60 * 1000; // 5 minutes before start time

    // Step 1: Set table to "Pending" 5 minutes before the booking starts
    setTimeout(async () => {
      const updatedTable = await Table.findOne({ id: tableNumber });
      if (updatedTable) {
        updatedTable.status = "Pending";
        await updatedTable.save();
        console.log(
          "Table status changed to 'Pending' 5 minutes before booking starts."
        );

        // Step 2: Wait exactly 5 minutes (or less if start time arrives earlier), then check if it's time to set to "Seated"
        const delay = Math.max(bookingStartTime - Date.now(), 2 * 60 * 1000); // If 5 minutes is shorter than the time left, we wait for 5 minutes, otherwise until the start time

        setTimeout(async () => {
          const tableDuringPending = await Table.findOne({ id: tableNumber });
          const now = Date.now(); // Get current time
          if (
            tableDuringPending &&
            tableDuringPending.status === "Pending" &&
            now >= bookingStartTime &&
            now < bookingEndTime
          ) {
            tableDuringPending.status = "Seated";
            await tableDuringPending.save();
            console.log("Table status changed to 'Seated' after 5 minutes.");
          } else if (now >= bookingEndTime) {
            console.log("Booking has already ended.");
          }
        }, delay); // Wait for either 5 minutes or the booking start time, whichever is shorter
      }
    }, fiveMinutesBeforeStart - currentTime);

    // Step 3: Set table to "Available" after the booking ends
    setTimeout(async () => {
      const updatedTable = await Table.findOne({ id: tableNumber });
      if (updatedTable && currentTime >= bookingEndTime) {
        updatedTable.status = "Available";
        await updatedTable.save();

        // Move booking to past bookings
        const pastBookingRecord = new PastBooking({ ...booking.toObject() });
        await pastBookingRecord.save();
        await Booking.findByIdAndDelete(booking._id); // Clean up the booking
        console.log(
          "Booking moved to past bookings, and table status updated to 'Available'."
        );
      }
    }, bookingEndTime - currentTime);

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

// Check table availability
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
