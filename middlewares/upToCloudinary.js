import { uploadToCloudinaryUser, uploadToCloudinaryFood, uploadToCloudinaryCover } from "../middlewares/cloudinaryUpload.js";

async function cloudinaryUploadMiddlewareById(req, res, next) {
    if (!req.files) return next();
    if (!req.body.user_id) return next();
    try {
        const fileArray = Object.values(req.files.photo);
        const urls = await Promise.all(
            fileArray.map(async (file) => {
                return await uploadToCloudinaryUser(file.filepath) && await uploadToCloudinaryCover(file.filepath);
            })
        );
        const img = urls;
        req.body.photo = img[0].toString();
        req.body.cover = img[1].toString();
        next();
    } catch (error) {
        console.error("Error al subir a Cloudinary:", error);
        res.status(500).json({ message: "Error al subir imagen", error });
    }
}

async function cloudinaryUploadMiddlewareFood(req, res, next) {
    try {
        if (!req.files) return next();
        const fileArray = Object.values(req.files.cover);
        const urls = await Promise.all(
            fileArray.map(async (file) => {
                return await uploadToCloudinaryFood(file.filepath);
            })
        );
        const img = urls;
        req.body.cover = img[0].toString();
        next();
    } catch (error) {
        console.error("Error al subir a Cloudinary:", error);
        res.status(500).json({ message: "Error al subir imagen", error });
    }
}

export { cloudinaryUploadMiddlewareById, cloudinaryUploadMiddlewareFood };