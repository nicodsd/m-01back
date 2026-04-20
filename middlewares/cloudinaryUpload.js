import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadToCloudinaryUser(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "user-logo",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}
async function uploadToCloudinaryCover(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "user-cover",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}
async function uploadToCloudinaryFood(filepath) {
  const result = await cloudinary.uploader.upload(filepath, {
    folder: "foods",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id
  };
}
export { uploadToCloudinaryUser, uploadToCloudinaryCover, uploadToCloudinaryFood };