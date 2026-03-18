import {
  uploadToCloudinaryUser,
  uploadToCloudinaryFood,
  uploadToCloudinaryCover,
} from "../middlewares/cloudinaryUpload.js";

async function cloudinaryUploadMiddlewareById(req, res, next) {
  if (!req.files) return next();

  try {
    // Subir Logo (photo) si existe
    if (req.files.photo) {
      // Formidable a veces manda un array o un objeto simple
      const photoFile = Array.isArray(req.files.photo)
        ? req.files.photo[0]
        : req.files.photo;
      const photoUrl = await uploadToCloudinaryUser(photoFile.filepath);
      req.body.photo = photoUrl; // Reemplazamos el objeto por el string de la URL
    }

    // Subir Portada (cover) si existe
    if (req.files.cover) {
      const coverFile = Array.isArray(req.files.cover)
        ? req.files.cover[0]
        : req.files.cover;
      const coverUrl = await uploadToCloudinaryCover(coverFile.filepath);
      req.body.cover = coverUrl; // Reemplazamos el objeto por el string de la URL
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al procesar imágenes" });
  }
}

async function cloudinaryUploadMiddlewareFood(req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) return next();
    const fileArray = Object.values(req.files.photo);
    const urls = await Promise.all(
      fileArray.map(async (file) => {
        return await uploadToCloudinaryFood(file.filepath);
      }),
    );
    const img = urls;
    req.body.photo = img[0].toString();
    next();
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    res.status(500).json({ message: "Error al subir imagen", error });
  }
}

export { cloudinaryUploadMiddlewareById, cloudinaryUploadMiddlewareFood };
