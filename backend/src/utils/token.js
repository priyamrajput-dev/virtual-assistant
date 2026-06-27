import JWT from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const genToken = (userId) => {
  try {
    const token = JWT.sign({userId}, ENV.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.error("❌ Error creating token", error);
  }
};
