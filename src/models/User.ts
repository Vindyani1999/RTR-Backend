import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true }, // Changed from username to email
  password: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
