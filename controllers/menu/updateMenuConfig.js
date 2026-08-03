import Menu from "../../models/Menu.js";
import User from "../../models/UserAuth.js";
const updateMenuConfig = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            template_id,
            navBar,
            presentation,
            enable_bebidas,
            enable_postres,
            top_sections,
            bottom_sections,
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
        let query = { user_id: user._id };

        const configToUpdate = {
            template_id,
            navBar,
            presentation,
            enable_bebidas,
            enable_postres,
            top_sections,
            bottom_sections,
            multipleStores,
            deliveryZones,
            delivery,
            paymentOptions,
            whatsAppCart,
            productsVisibilityPay
        };

        // Actualizamos TODOS los menús del usuario
        await Menu.updateMany(query, { $set: configToUpdate });

        // Buscamos un menú para devolverlo en la respuesta (el principal o cualquiera actualizado)
        let findQuery = { user_id: user._id };
        if (req.body.menu_id) {
            findQuery._id = req.body.menu_id;
        }
        const menu = await Menu.findOne(findQuery);

        return res
            .status(200)
            .json({
                success: true,
                status: 200,
                message: "Configuración actualizada en todos los menús exitosamente",
                menu,
            });
    } catch (error) {
        next(error);
    }
}

export default updateMenuConfig