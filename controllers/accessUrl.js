import Food from "../models/Food.js"
import Menu from "../models/Menu.js"
import User from "../models/UserAuth.js"
let read = async (req, res, next) => {
    let { name } = req.params
    name = name.replace(/-/g, " ")
    try {
        let user = await User.findOne({ name: name })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }
        let foods = await Food.find({ user_id: user._id })
        let menu = await Menu.findOne({ user_id: user._id })
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu no encontrado",
            });
        }
        let data = {
            name: user.name,
            plan: user.plan,
            location: menu?.location,
            description: menu?.description,
            phone: menu?.phone,
            cover: menu?.cover,
            photo: menu?.photo,
            instagram: menu?.instagram,
            tiktok: menu?.tiktok,
            facebook: menu?.facebook,
            template_id: menu?.template_id,
            foods,
            navBar: menu.navBar,
            menuConfig: menu.menuConfig,
            multipleStores: menu.multipleStores,
            deliveryZones: menu.deliveryZones,
            delivery: menu.delivery,
            whatsAppCart: menu.whatsAppCart,
            productsVisibilityPay: menu.productsVisibilityPay
        }
        return res.status(200)
            .json({
                data
            })
    } catch (error) {
        next(error)
    }
}
export default read 