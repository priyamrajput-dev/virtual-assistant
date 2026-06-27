import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    assistantName: {
      type: String,
    },
    assistantImage: {
      type: String,
    },
    assistantHistory: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);