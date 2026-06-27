import * as authService from "../services/auth.service.js";
import ApiError from "../utils/api.error.js";
import ApiResponse from "../utils/api.response.js";
import { clearCookie, setCookie } from "../utils/cookies.js";

export const signUp = async (req, res, next) => {
  try {
    const { user, token } = await authService.signUp(req.body);

    setCookie(res, token);

    return ApiResponse.created(res, "User created successfully", {
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { user, token } = await authService.signIn(req.body);

    setCookie(res, token);

    return ApiResponse.ok(res, "User logged in successfully", {
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res, next) => {
  try {
    clearCookie(res);

    return ApiResponse.ok(res, "User logged out successfully");
  } catch (error) {
    next(error);
  }
};
