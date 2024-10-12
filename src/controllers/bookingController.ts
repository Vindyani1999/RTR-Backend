import { Request, Response } from "express";
import bookingService from "../services/bookingService";

export const bookTable = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tableNumber, startTime, endTime, date } = req.body;

    // Check table availability based on the time slot
    const isAvailable = await bookingService.checkAvailability(
      tableNumber,
      startTime,
      endTime,
      date
    );

    if (!isAvailable) {
      res
        .status(400)
        .json({ message: "Table is not available for this time slot" });
      return;
    }

    // Proceed with booking the table
    const booking = await bookingService.bookTable(req.body);
    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "An unknown error occurred" });
  }
};
