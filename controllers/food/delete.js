import Food from "../../models/Food.js";
import { v2 as cloudinary } from "cloudinary"; // Asegúrate de tener la importación

export default async function deleteFood(req, res, next) {
  try {
    const { ids } = req.body; // Se espera un array de IDs

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No se proporcionaron IDs" });
    }

    // 1. Buscamos todos los platos que se van a borrar para obtener sus publicIds
    const foodsToDelete = await Food.find({ _id: { $in: ids } });

    if (foodsToDelete.length === 0) {
      return res.status(404).json({ message: "Comidas no encontradas" });
    }

    // 2. Extraemos los publicIds (asumiendo que los guardaste como photoId)
    // Filtramos para evitar intentar borrar si algún registro no tiene ID de foto
    const publicIds = foodsToDelete
      .map(food => food.photoId)
      .filter(id => id !== undefined && id !== null);

    // 3. Borramos de Cloudinary
    // Usamos Promise.all para que sea rápido si son muchos
    if (publicIds.length > 0) {
      await Promise.all(
        publicIds.map(id => cloudinary.uploader.destroy(id))
      );
    }

    // 4. Ahora sí, borramos de MongoDB
    const result = await Food.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: "Eliminado con éxito",
      deletedCount: result.deletedCount,
      response: foodsToDelete // Opcional por si quieres devolver qué se borró
    });

  } catch (error) {
    console.error("Error en deleteFood:", error);
    next(error);
  }
}