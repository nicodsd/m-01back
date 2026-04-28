import Menu from "../../models/Menu.js";
import User from "../../models/UserAuth.js";
const updateMenuConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            template_id,
            navBar,
            menuConfig,
            multipleStores,
            deliveryZones,
            delivery,
            paymentOptions,
            whatsAppCart,
            productsVisibilityPay
        } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, status: 404, message: "Usuario no encontrado" });
        }
        const menu = await Menu.findOneAndUpdate({ user_id: user._id }, {
            template_id,
            navBar,
            menuConfig,
            multipleStores,
            deliveryZones,
            delivery,
            paymentOptions,
            whatsAppCart,
            productsVisibilityPay
        }, { new: true });
        return res
            .status(200)
            .json({
                success: true,
                status: 200,
                message: "Configuración del menú actualizada exitosamente",
                menu,
            });
    } catch (error) {
        next(error);
    }
}

export default updateMenuConfig