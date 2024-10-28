// controllers/bookingController.ts
import { Request, Response } from "express";
import * as bookingService from "../services/pastBookingService";

export const getAllPastBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pastBookings = await bookingService.getAllPastBookings();
    res.status(200).json({ success: true, data: pastBookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching past bookings", error });
  }
};
