import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudnary = async (LocalfilePath) => {
  try {
    if (!LocalfilePath) {
      throw new Error("File path is required");
    }
    const result = await cloudinary.uploader.upload(LocalfilePath, {
      resource_type: "auto",
    });
    console.log(result, result.url);
    return result;
  } catch (err) {
    fs.unlinkSync(LocalfilePath); // remove file from local storage as it is already uploaded on cloudnary
  }
};

export default uploadOnCloudnary;
