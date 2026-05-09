import Menu from "../../models/Menu.js";

export default async function deleteMenu(req, res, next) {
    const { id } = req.params;
    try {
        const deletedMenu = await Menu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return res.status(404).json({
                success: false,
                message: "Menú no encontrado.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Menú eliminado exitosamente.",
            menu: deletedMenu,
        });
    } catch (error) {
        next(error);
    }
}