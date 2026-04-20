import Food from "../../models/Food.js";
import { v2 as cloudinary } from "cloudinary";

export default async function updateFood(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // 1. Buscamos el plato actual antes de actualizar para tener el ID de la foto vieja
    const oldFood = await Food.findById(id);
    if (!oldFood) return res.status(404).json({ success: false, message: "Comida no encontrada" });

    // 2. Lógica de Promoción (Unificada para evitar doble llamada a la DB)
    if (updates.is_promo === "true" || updates.is_promo === true) {
      updates.is_promo = true;
      if (updates.promo_price !== undefined) {
        updates.price = updates.promo_price;
      }
    } else if (updates.is_promo === "false" || updates.is_promo === false) {
      updates.is_promo = false;
    }

    // 3. LIMPIEZA DE CLOUDINARY:
    // Si el middleware subió una foto nueva (updates.photoId), borramos la que estaba antes.
    if (updates.photoId && oldFood.photoId && updates.photoId !== oldFood.photoId) {
      try {
        await cloudinary.uploader.destroy(oldFood.photoId);
        console.log("Imagen anterior eliminada de Cloudinary con éxito");
      } catch (clouderror) {
        console.error("Error al borrar imagen vieja en Cloudinary:", clouderror);
        // No bloqueamos el flujo si falla Cloudinary, pero lo logueamos
      }
    }

    // 4. Única actualización en la base de datos
    const food = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      food: food,
    });
  } catch (error) {
    next(error);
  }
}