import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js"
import { v2 as cloudinary } from "cloudinary";

export default async function updateUser(req, res, next) {
  const { id } = req.params;
  const updates = req.body;
  console.log(id);
  console.log(updates);
  /*  try {
 
     const userID = await User.findById(id);
     if (!userID) return res.status(404).json({ success: false, message: "Usuario no encontrado" });
 
     if (userID) {
       const menu = await Menu.findOne({ user_id: userID._id });
       if (menu) {
         if(updates.photoId) menu.logo = updates.photoId;
         if(updates.coverId) menu.coverPhoto = updates.coverId;
         await menu.save();
       }
     }
 
     // --- LÓGICA PARA FOTO DE PERFIL (photo) ---
     if (updates.photoId && userID.photoId && updates.photoId !== userID.photoId) {
       await cloudinary.uploader.destroy(userID.photoId);
       console.log("Foto de perfil vieja eliminada");
     }
 
     // --- LÓGICA PARA FOTO DE PORTADA (coverPhoto) ---
     // Asumiendo que tu middleware inyecta 'coverPhotoId' cuando se sube la portada
     if (updates.coverId && userID.coverId && updates.coverId !== userID.coverId) {
       await cloudinary.uploader.destroy(userID.coverId);
       console.log("Foto de portada vieja eliminada");
     }
 
     const user = await User.findByIdAndUpdate(id, updates, {
       new: true,
       runValidators: true,
     });
 
     res.status(200).json({ success: true, user });
   } catch (error) {
     next(error);
   } */
}