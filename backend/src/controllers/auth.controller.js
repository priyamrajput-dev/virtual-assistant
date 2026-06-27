import * as authService from "../services/auth.service.js";
import ApiError from "../utils/api.error.js";
import ApiResponse from "../utils/api.response.js";
import { clearCookie, setCookie } from "../utils/cookies.js";

export const signUp = async (req, res) => {
  try {
    const { user, token } = await authService.signUp(req.body);

    setCookie(res, token);

    return ApiResponse.created(res, "User created successfully", {
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { user, token } = await authService.signIn(req.body);

    setCookie(res, token);

    return ApiResponse.ok(res, "User logged in successfully", {
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logOut = (req, res) => {
  try {
    clearCookie(res);

    return ApiResponse.ok(res, "User logged out successfully");
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};