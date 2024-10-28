import { Request, Response } from "express";
import * as bookingService from "../services/bookingService";

export const makeReservation = async (req: Request, res: Response) => {
  try {
    const bookingData = req.body; // Validate this as per your requirements
    const booking = await bookingService.createBooking(bookingData);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const handleExpiredBookings = async (req: Request, res: Response) => {
  try {
    await bookingService.updateExpiredBookings();
    res.status(200).json({ message: "Expired bookings updated successfully." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await bookingService.getAllBookingsService();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
