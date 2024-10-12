import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  chairs: { type: Number, required: true },
  status: { type: String, required: true, default: "Available" },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Table = mongoose.model("Table", tableSchema);
export default Table;
