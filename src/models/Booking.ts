import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the document structure
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface BookingDocument extends Document {
  tableNumber: number;
  tableType: string; // Corresponds to the Table type
  tablePrice: number;
  numberOfChairs: number;
  selectedDate: string;
  startTime: string;
  endTime: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numberOfPeople: number;
  address: string;
  cartItems: CartItem[]; // Define cartItems as an array of CartItem
}

// Define the schema for the Booking model
const BookingSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true },
  tableType: { type: String, required: true },
  tablePrice: { type: Number, required: true },
  numberOfChairs: { type: Number, required: true },
  selectedDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  address: { type: String, required: true },
  cartItems: [
    {
      id: { type: String },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

// Export the model
export default mongoose.model<BookingDocument>("Booking", BookingSchema);
