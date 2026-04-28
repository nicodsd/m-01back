import Menu from "../../models/Menu.js";
import User from "../../models/UserAuth.js";

export default async function updateMenuInfo(req, res, next) {
    try {
        const { id } = req.params; // ID del Usuario
        const { name, ...menuData } = req.body;

        let updatedUser = null;

        // 1. Si viene el nombre, actualizamos la colección User
        if (name) {
            updatedUser = await User.findByIdAndUpdate(
                id,
                { name },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ success: false, message: "Usuario no encontrado" });
            }
        }

        // 2. Actualizamos la colección Menu usando el user_id
        // Nota: Filtramos campos undefined para no pisar datos existentes con null
        const updatedMenu = await Menu.findOneAndUpdate(
            { user_id: id },
            { $set: menuData },
            { new: true }
        );

        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: "Menú no encontrado" });
        }

        // 3. Respuesta unificada
        return res.status(200).json({
            success: true,
            message: "Perfil y Menú actualizados",
            user: updatedUser ? updatedUser.name : undefined, // Directo en la raíz
            menu: updatedMenu._doc, // Directo en la raíz
        });

    } catch (error) {
        next(error);
    }
}