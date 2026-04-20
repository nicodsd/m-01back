import {
  uploadToCloudinaryUser,
  uploadToCloudinaryFood,
  uploadToCloudinaryCover,
} from "../middlewares/cloudinaryUpload.js";

async function cloudinaryUploadMiddlewareById(req, res, next) {
  // Si no hay archivos, seguimos adelante
  if (!req.files || Object.keys(req.files).length === 0) return next();

  try {
    // 1. Subir Logo (photo) si existe
    if (req.files.photo) {
      const photoFile = Array.isArray(req.files.photo)
        ? req.files.photo[0]
        : req.files.photo;

      // uploadToCloudinaryUser debe devolver { url, publicId }
      const photoResult = await uploadToCloudinaryUser(photoFile.filepath);

      if (photoResult && photoResult.url) {
        req.body.photo = photoResult.url;
        req.body.photoId = photoResult.publicId;
      }
    }

    // Console logs para verificar la subida de la foto de perfil
    console.log("Foto URL:", req.body.photo);
    console.log("Foto ID:", req.body.photoId);

    // 2. Subir Portada (coverPhoto) si existe
    // Nota: Asegúrate que desde el frontend el campo se llame 'coverPhoto' o cámbialo aquí
    if (req.files.cover) {
      const coverFile = Array.isArray(req.files.cover)
        ? req.files.cover[0]
        : req.files.cover;

      const coverResult = await uploadToCloudinaryCover(coverFile.filepath);

      if (coverResult && coverResult.url) {
        req.body.cover = coverResult.url;
        req.body.coverId = coverResult.publicId;
      }
    }

    console.log("Portada URL:", req.body.cover);
    console.log("Portada ID:", req.body.coverId);

    next();
  } catch (error) {
    console.error("Error en el middleware de subida:", error);
    res.status(500).json({
      success: false,
      message: "Error al procesar imágenes",
      error: error.message
    });
  }
}

async function cloudinaryUploadMiddlewareFood(req, res, next) {
  try {
    if (!req.files || !req.files.photo) return next();

    // Convertimos a array por si vienen varias, como ya hacías
    const fileArray = Array.isArray(req.files.photo)
      ? req.files.photo
      : [req.files.photo];

    const uploadResults = await Promise.all(
      fileArray.map(async (file) => {
        return await uploadToCloudinaryFood(file.filepath);
      }),
    );

    if (uploadResults.length > 0) {
      req.body.photo = uploadResults[0].url;
      req.body.photoId = uploadResults[0].publicId;
    }

    next();
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    res.status(500).json({ message: "Error al subir imagen", error });
  }
}

export { cloudinaryUploadMiddlewareById, cloudinaryUploadMiddlewareFood };
