import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({ "any.required": "Ingresa un nombre", "string.empty": "Ingresa un nombre", "string.min": "Ingresa al menos 3 caracteres", "string.max": "Ingresa como máximo 20 caracteres", }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({ "any.required": "Ingresa un email", "string.empty": "Ingresa un email", "string.email": "Ingresa un email valido", }),
  password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({ "any.required": "Ingresa una contraseña", "string.empty": "Ingresa una contraseña", "string.min": "Ingresa al menos 8 caracteres", "string.pattern.base": "La contraseña debe contener una mayúscula, una minúscula y un número", }),

  plan: Joi.string().required(),
  mp_preapproval_id: Joi.string().allow("", null).optional(),

  is_active: Joi.any().required(),
  is_online: Joi.any().required(),

  //menuData
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

  //menuConfig
  template_id: Joi.string().optional().default("default").messages({ "string.empty": "Ingresa un template_id", }),
  navBar: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un navBar", }),
  menuConfig: Joi.number().optional().default(0).messages({ "number.empty": "Ingresa un menuConfig", }),
  multipleStores: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un multipleStores", }),
  deliveryZones: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un deliveryZones", }),
  delivery: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un delivery", }),
  paymentOptions: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un paymentOptions", }),
  whatsAppCart: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Ingresa un whatsAppCart", }),
  productsVisibilityPay: Joi.boolean().required().default(false).messages({ "any.required": "Ingresa un productsVisibilityPay", "boolean.empty": "Ingresa un productsVisibilityPay", }),

  /*   is_verified: Joi.boolean().default(false),
    verify_code: Joi.string().allow("", null),
    notifications: Joi.any(), */
});

export const userSignIn = Joi.object({ email: Joi.string().required().email({ minDomainSegments: 2 }).messages({ "any.required": "Ingresa un email", "string.empty": "Ingresa un email", "string.email": "Ingresa un email valido", }), password: Joi.string().required().messages({ "any.required": "Ingresa una contraseña", "string.empty": "Ingresa una contraseña", }), });
export const userUpdate = Joi.object({ name: Joi.string().min(3).max(20).messages({ "string.min": "Ingresa al menos 3 caracteres.", "string.max": "Ingresa como máximo 20 caracteres.", }) });
export const userUpdateIsOnline = Joi.object({ is_online: Joi.any().required().messages({ "any.required": "Faltó el estado de la cuenta", "any.empty": "Faltó el estado de la cuenta", }), });
export const userUpdateSubscriptionMp = Joi.object({ mp_preapproval_id: Joi.string().required().messages({ "any.required": "Ingresa un mp_preapproval_id", "string.empty": "Ingresa un mp_preapproval_id", }), mp_subscription_state: Joi.string().required().messages({ "any.required": "Ingresa un mp_subscription_state", "string.empty": "Ingresa un mp_subscription_state", }), mp_subscription_id: Joi.string().required().messages({ "any.required": "Ingresa un mp_subscription_id", "string.empty": "Ingresa un mp_subscription_id", }), });