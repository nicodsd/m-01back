import Joi from "joi";

export const menuSignUp = Joi.object({
    user_id: Joi.string().required().messages({ "any.required": "Ingresa un user_id", "string.empty": "Ingresa un user_id", }),
    photo: Joi.string().uri().optional().messages({ "string.uri": "Ingresa una foto válida.", }),
    photoId: Joi.string().allow("", null).optional().messages({ "string.empty": "Photo ID required", }),
    cover: Joi.string().uri().optional().messages({ "string.uri": "Ingresa una portada válida.", }),
    coverId: Joi.string().allow("", null).optional().messages({ "string.empty": "Cover ID required", }),
    phone: Joi.string().allow("", null).optional().messages({ "string.empty": "Ingresa un número de teléfono", "string.min": "Ingresa al menos 7 caracteres", "string.max": "Ingresa como máximo 10 caracteres", }),
    location: Joi.string().allow("", null).optional().messages({ "string.empty": "Ingresa una dirección", "string.min": "Ingresa al menos 5 caracteres", "string.max": "Ingresa como máximo 20 caracteres", }),
    description: Joi.string().allow("", null).optional().messages({ "string.empty": "Ingresa una descripción", "string.min": "Ingresa al menos 5 caracteres", "string.max": "Ingresa como máximo 30 caracteres", }),
    instagram: Joi.string().allow("", null).optional().messages({ "string.empty": "Instagram requerido", }),
    tiktok: Joi.string().allow("", null).optional().messages({ "string.empty": "Tiktok requerido", }),
    facebook: Joi.string().allow("", null).optional().messages({ "string.empty": "Facebook requerido", }),

    //config
    template_id: Joi.string().optional().default("default").messages({ "string.empty": "Ingresa un template_id", }),
    navBar: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un navBar", }),
    menuConfig: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un menuConfig", }),
    multipleStores: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un multipleStores", }),
    deliveryZones: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un deliveryZones", }),
    delivery: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un delivery", }),
    paymentOptions: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un paymentOptions", }),
    whatsAppCart: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un whatsAppCart", }),
    productsVisibilityPay: Joi.boolean().required().default(false).messages({ "any.required": "Ingresa un productsVisibilityPay", "boolean.empty": "Ingresa un productsVisibilityPay", }),
});

export const menuInfoUpdate = Joi.object({
    user_id: Joi.string().optional().messages({ "string.empty": "Ingresa un user_id", "string.min": "Ingresa al menos 5 caracteres", "string.max": "Ingresa como máximo 30 caracteres", }),
    name: Joi.string().optional().messages({ "string.empty": "Ingresa un nombre", "string.min": "Ingresa al menos 5 caracteres", "string.max": "Ingresa como máximo 30 caracteres", }),
    location: Joi.string().allow("", null).optional().min(5).max(20).messages({ "string.min": "Ingresa al menos 5 caracteres.", "string.max": "Ingresa como máximo 20 caracteres.", }),
    description: Joi.string().allow("", null).optional().min(5).max(30).messages({ "string.min": "Ingresa al menos 5 caracteres.", "string.max": "Ingresa como máximo 30 caracteres.", }),
    phone: Joi.string().allow("", null).optional().min(7).max(10).messages({ "string.min": "Ingresa un numero válido.", "string.max": "Ingresa un numero válido.", }),
    photo: Joi.string().uri().optional().allow("", null).messages({ "string.uri": "Ingresa una URL válida para la foto.", }),
    photoId: Joi.string().optional().allow("", null).messages({ "string.empty": "Photo ID required", }),
    cover: Joi.string().uri().optional().allow("", null).messages({ "string.uri": "Ingresa una URL válida para la portada.", }),
    coverId: Joi.string().allow("", null).optional().messages({ "string.empty": "Cover ID required", }),
    instagram: Joi.string().allow("", null).optional().messages({ "string.uri": "Ingresa una URL válida para Instagram.", }),
    tiktok: Joi.string().allow("", null).optional().messages({ "string.uri": "Ingresa una URL válida para TikTok.", }),
    facebook: Joi.string().allow("", null).optional().messages({ "string.uri": "Ingresa una URL válida para Facebook.", }),
});

export const menuConfigUpdate = Joi.object({
    template_id: Joi.string().optional().default("default").messages({ "string.empty": "Ingresa un template_id", }),
    navBar: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un navBar", }),
    menuConfig: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un menuConfig", }),
    multipleStores: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un multipleStores", }),
    deliveryZones: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un deliveryZones", }),
    delivery: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un delivery", }),
    paymentOptions: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un paymentOptions", }),
    whatsAppCart: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un whatsAppCart", }),
    productsVisibilityPay: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un productsVisibilityPay", }),
});