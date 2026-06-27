import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env";
import fs from "fs"

export const uploadOnCloudinary = async(filePath) => {
  cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
  });
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult.secure_url
  }
   catch (error) {
    fs.unlinkSync(filePath);
    next(error);
  }
};
