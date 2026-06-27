import ApiError from "../utils/api.error.js";
import JWT from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const isAuth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      throw ApiError.badRequest("Token not found");
    }
    const verifyToken = await JWT.verify(token, ENV.JWT_SECRET);
    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    next(error)
  }
};
