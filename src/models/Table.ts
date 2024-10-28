import mongoose, { Schema, Document } from "mongoose";

export interface Table extends Document {
  tableNumber: number;
  type: string;
  chairs: number;
  status: string;
  x: number;
  y: number;
  price: number;
}

const TableSchema: Schema = new Schema({
  tableNumber: { type: Number, required: true, unique: true },
  type: { type: String, required: true }, // e.g., 'squareBig', 'roundMedium', etc.
  chairs: { type: Number, required: true },
  status: { type: String, default: "Available" }, // e.g., 'Available', 'Seated'
  x: { type: Number, required: true }, // Fixed x position
  y: { type: Number, required: true }, // Fixed y position
  price: { type: Number, required: true },
});

// Exporting the model
const TableModel = mongoose.model<Table>("Tables", TableSchema);
export default TableModel;
