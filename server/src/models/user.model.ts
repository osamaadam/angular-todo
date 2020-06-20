import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

export interface UserType extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  registerDate: Date;
}

const User = mongoose.model<UserType>("users", UserSchema);

export default User;
