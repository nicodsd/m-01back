import Menu from "../../models/Menu.js";
import { v2 as cloudinary } from "cloudinary";

export default async function deleteMenu(req, res, next) {
    const { ids } = req.params;
    const arrayIds = ids.split(",");
    try {
        const menusToDelete = await Menu.find({ _id: { $in: arrayIds } });
        if (menusToDelete.length === 0) {
            return res.status(404).json({ message: "Menús no encontrados" });
        }
        const publicIds = menusToDelete
            .map(menu => menu.photoId)
            .filter(id => id !== undefined && id !== null);

        if (publicIds.length > 0) {
            await Promise.all(
                publicIds.map(id => cloudinary.uploader.destroy(id))
            );
        }
        const publicIdsCover = menusToDelete
            .map(menu => menu.coverId)
            .filter(id => id !== undefined && id !== null);
        if (publicIdsCover.length > 0) {
            await Promise.all(
                publicIdsCover.map(id => cloudinary.uploader.destroy(id))
            );
        }

        const deletedMenus = await Menu.deleteMany({ _id: { $in: arrayIds } });
        if (!deletedMenus) {
            return res.status(404).json({
                success: false,
                message: "Menús no encontrados.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Menús eliminados exitosamente.",
            menu: deletedMenus,
        });
    } catch (error) {
        next(error);
    }
}