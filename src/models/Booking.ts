import mongoose, { Schema, Document } from "mongoose";

export interface BookingDocument extends Document {
  tableNumber: number;
  tableType: string; // Corresponds to the Table type
  tablePrice: number;
  numberOfChairs: number;
  date: string;
  startTime: string;
  endTime: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numberOfPeople: number;
  address: string;
}

const BookingSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true },
  tableType: { type: String, required: true },
  tablePrice: { type: Number, required: true },
  numberOfChairs: { type: Number, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  address: { type: String, required: true },
});

export default mongoose.model<BookingDocument>("Booking", BookingSchema);
