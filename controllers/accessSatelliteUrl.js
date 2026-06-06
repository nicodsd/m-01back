import Food from "../models/Food.js";
import Menu from "../models/Menu.js";
import User from "../models/UserAuth.js";
import mongoose from "mongoose";

let readSatellite = async (req, res, next) => {
    let { name, locationOrId } = req.params;
    name = name.replace(/-/g, " ");
    
    // Si la url puede traer guiones para espacios en el location
    let parsedLocation = locationOrId.replace(/-/g, " ");

    try {
        let user = await User.findOne({ name: name });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }

        // Buscar el menu que coincida con user_id y (location igual a parsedLocation O el id)
        let query = { user_id: user._id };
        
        let isObjectId = mongoose.Types.ObjectId.isValid(locationOrId);
        
        if (isObjectId) {
            query.$or = [
                { location: { $regex: new RegExp(`^${parsedLocation}$`, 'i') } },
                { _id: locationOrId }
            ];
        } else {
            query.location = { $regex: new RegExp(`^${parsedLocation}$`, 'i') };
        }

        let menu = await Menu.findOne(query);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menú satélite no encontrado",
            });
        }

        let allFoods = await Food.find({ user_id: user._id }).sort({ order: 1 });
        let foods = allFoods.filter(f => !f.menus || f.menus.length === 0 || f.menus.some(id => id.toString() === menu._id.toString()));

        let data = {
            _id: user._id,
            menu_id: menu._id,
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
            presentation: menu.presentation,
            multipleStores: menu.multipleStores,
            deliveryZones: menu.deliveryZones,
            enable_bebidas: menu.enable_bebidas,
            enable_postres: menu.enable_postres,
            delivery: menu.delivery,
            whatsAppCart: menu.whatsAppCart,
            productsVisibilityPay: menu.productsVisibilityPay
        };

        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
}
export default readSatellite;
