import Menu from "../../models/Menu.js";
import User from "../../models/UserAuth.js";
import { v2 as cloudinary } from "cloudinary";

export default async function updateMenuInfo(req, res, next) {
    try {
        const { id } = req.params;
        const { name, photo, cover, photoId, coverId, menu_id, ...menuData } = req.body;

        // 1. Ejecutar las búsquedas/actualizaciones iniciales en paralelo
        const userPromise = name
            ? User.findByIdAndUpdate(id, { name }, { new: true, runValidators: true })
            : User.findById(id);

        const menuQuery = menu_id ? { _id: menu_id, user_id: id } : { user_id: id };
        const menuPromise = Menu.findOne(menuQuery);

        const [user, menu] = await Promise.all([userPromise, menuPromise]);

        if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        if (!menu) return res.status(404).json({ success: false, message: "Menú no encontrado" });

        // 2. Limpieza de imágenes antiguas en Cloudinary (asíncrono en segundo plano)
        const deletionPromises = [];
        if (photoId && menu.photoId && photoId !== menu.photoId) {
            deletionPromises.push(cloudinary.uploader.destroy(menu.photoId));
        }
        if (coverId && menu.coverId && coverId !== menu.coverId) {
            deletionPromises.push(cloudinary.uploader.destroy(menu.coverId));
        }

        // Ejecutar eliminación sin detener la actualización principal
        if (deletionPromises.length > 0) {
            Promise.all(deletionPromises).catch(err => console.error("Error al eliminar imágenes en Cloudinary:", err));
        }

        // 3. Preparar campos actualizados del menú
        const updatePayload = { ...menuData };
        if (photo) updatePayload.photo = photo;
        if (cover) updatePayload.cover = cover;
        if (photoId) updatePayload.photoId = photoId;
        if (coverId) updatePayload.coverId = coverId;

        // 4. Actualizar el documento en Mongo en una sola operación
        const updatedMenu = await Menu.findByIdAndUpdate(
            menu._id,
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        // 5. Respuesta unificada
        return res.status(200).json({
            success: true,
            message: "Perfil y Menú actualizados correctamente",
            user: user.name,
            menu: updatedMenu
        });

    } catch (error) {
        next(error);
    }
}