import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadToCloudinaryUser(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "usuarios",
  });
  return result.secure_url;
}
async function uploadToCloudinaryFood(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "foods",
  });
  return result.secure_url;
}
export { uploadToCloudinaryUser, uploadToCloudinaryFood };