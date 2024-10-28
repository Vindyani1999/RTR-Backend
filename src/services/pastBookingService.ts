import PastBooking from "../models/PastBooking";
import { Document } from "mongoose";

export const getAllPastBookings = async (): Promise<Document[]> => {
  return await PastBooking.find();
};
