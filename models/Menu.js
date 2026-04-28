import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    photo: { type: String, required: false },
    cover: { type: String, required: false },
    photoId: { type: String, required: false },
    coverId: { type: String, required: false },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    phone: { type: String, default: "" },
    instagram: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    facebook: { type: String, default: "" },

    //config
    template_id: { type: String, default: "default" },
    navBar: { type: Number, default: 0 },
    menuConfig: { type: Number, default: 0 },
    multipleStores: { type: Boolean, default: false },
    deliveryZones: { type: Boolean, default: false },
    delivery: { type: Boolean, default: false },
    paymentOptions: { type: Boolean, default: false },
    whatsAppCart: { type: Boolean, default: true },
    productsVisibilityPay: { type: Boolean, default: false }
});

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;