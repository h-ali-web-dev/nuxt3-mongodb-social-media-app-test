import mongoose from "mongoose";

export interface UserInterface extends Document {
  email: String;
  username: String;
  password: String;
}
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    length: [8, "Password must be at least 8 characters"],
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
