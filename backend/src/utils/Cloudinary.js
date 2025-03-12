import { v2 as Cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (localfilepath) => {
  try {
    if (!fs.existsSync(localfilepath)) {
      throw new Error("File not found!");
    }

    const result = await Cloudinary.uploader.upload(localfilepath, {
      folder: "TeacherProfilePicture",
    });

    return result; // Return the upload result (URL, public_id, etc.)
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null; // Return null if upload fails
  }
};

export default cloudinaryUpload;
