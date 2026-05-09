import Menu from "../../models/Menu.js";

export default async function getAllMenus(req, res, next) {
    const { id } = req.params;
    try {
        const menus = await Menu.find({ user_id: id }).limit(20);
        res.status(200).json({ menus });
    } catch (error) {
        next(error);
    }
}