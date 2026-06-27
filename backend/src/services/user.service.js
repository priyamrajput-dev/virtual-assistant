import User from "../models/user.model.js";

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return {
    user,
  };
};
