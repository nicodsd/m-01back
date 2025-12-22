import { uploadToCloudinaryUser, uploadToCloudinaryFood } from "../middlewares/cloudinaryUpload.js";
async function cloudinaryUploadMiddleware(req, res, next) {
    try {
        if (!req.files) return next();
        const fileArray = Object.values(req.files.photo);
        const urls = await Promise.all(
            fileArray.map(async (file) => {
                if (!req.body.user_id) {
                    return await uploadToCloudinaryUser(file.filepath);
                } else {
                    return await uploadToCloudinaryFood(file.filepath);
                }
            })
        );
        const img = urls;
        req.body.photo = img[0].toString();
        next();
    } catch (error) {
        console.error("Error al subir a Cloudinary:", error);
        res.status(500).json({ message: "Error al subir imagen", error });
    }
};
export default cloudinaryUploadMiddleware;