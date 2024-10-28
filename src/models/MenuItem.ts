import mongoose, { Document, Schema } from "mongoose";

export interface IMenuItem extends Document {
  title: string;
  price: number;
  description: string;
  categories: string[];
  image: string;
}

const MenuItemSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
