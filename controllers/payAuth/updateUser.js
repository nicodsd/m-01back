import User from "../../models/UserAuth.js";
import { v2 as cloudinary } from "cloudinary";

export default async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log(updates)

    const currentUser = await User.findById(id);
    if (!currentUser) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    // --- LÓGICA PARA FOTO DE PERFIL (photo) ---
    if (updates.photoId && currentUser.photoId && updates.photoId !== currentUser.photoId) {
      await cloudinary.uploader.destroy(currentUser.photoId);
      console.log("Foto de perfil vieja eliminada");
    }

    // --- LÓGICA PARA FOTO DE PORTADA (coverPhoto) ---
    // Asumiendo que tu middleware inyecta 'coverPhotoId' cuando se sube la portada
    if (updates.coverId && currentUser.coverId && updates.coverId !== currentUser.coverId) {
      await cloudinary.uploader.destroy(currentUser.coverId);
      console.log("Foto de portada vieja eliminada");
    }

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
}