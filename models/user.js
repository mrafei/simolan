import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    image: String,
    hash: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
