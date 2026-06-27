import User from "../models/user.model.js";
import ApiError from "../utils/api.error.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/token.js";

export const signUp = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = genToken(user._id);

  return {
    user,
    token,
  };
};

export const signIn = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  const token = genToken(user._id);

  return {
    user,
    token,
  };
};