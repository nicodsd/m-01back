import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js";

const createMenu = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email requerido." });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        const menuData = {
            user_id: user._id,
            template_id: req.body.template_id || "default",
            photo: req.body.photo || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777043297/user-logo/jcy4ujuqyiuii3ldt0rk.png",
            cover: user.plan !== "free" ? req.body.cover || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777142062/user-cover/Mask_group_v7dp7q.png" : "",
            photoId: req.body.photoId || "",
            coverId: req.body.coverId || "",
            location: req.body.location || "",
            description: req.body.description || "",
            phone: req.body.phone || "",
            instagram: req.body.instagram || "",
            tiktok: req.body.tiktok || "",
            facebook: req.body.facebook || "",
            schedule: req.body.schedule || "",
            navBar: 0,
            menuEnlisted: 1,
            menuConfig: 0,
            multipleStores: false,
            deliveryZones: false,
            delivery: false,
            paymentOptions: false,
            whatsAppCart: true,
            productsVisibilityPay: user.plan === "free" ? false : true,
        };

        let newMenu = new Menu(menuData);
        await newMenu.save();

        user.active_menu_id = newMenu._id;
        await user.save();

        return res.status(201).json({
            success: true,
            message: "Menú creado exitosamente.",
            menu: newMenu
        });

    } catch (error) {
        console.error("Error al crear menú:", error);
        next(error);
    }
};

export default createMenu;
