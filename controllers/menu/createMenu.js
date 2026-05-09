import Menu from "../../models/Menu.js";
import User from "../../models/UserAuth.js";

export default async function createMenu(req, res, next) {
    const { id } = req.params;
    const menuData = {
        user_id: id,
        template_id: req.body.template_id || "default",
        photo: req.body.photo || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777043297/user-logo/jcy4ujuqyiuii3ldt0rk.png",
        cover: req.body.plan !== "free" ? req.body.cover || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777142062/user-cover/Mask_group_v7dp7q.png" : "",
        photoId: req.body.photoId || "",
        coverId: req.body.coverId || "",
        location: req.body.location || "",
        description: req.body.description || "",
        phone: req.body.phone || "",
        instagram: req.body.instagram || "",
        tiktok: req.body.tiktok || "",
        facebook: req.body.facebook || "",
        navBar: "default",
        presentation: "default",
        menuEnlisted: req.body.menuEnlisted,
        multipleStores: false,
        enable_bebidas: false,
        enable_postres: false,
        deliveryZones: false,
        delivery: false,
        paymentOptions: false,
        whatsAppCart: true,
        productsVisibilityPay: false,
    }

    try {
        const newMenu = new Menu(menuData);
        await newMenu.save();
        const updatedUser = await User.findByIdAndUpdate(id, { menu_id: newMenu._id });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado.",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Menú creado exitosamente.",
            menu: newMenu,
        });
    } catch (error) {
        next(error);
    }
}