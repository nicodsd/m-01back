import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().allow("").required().min(3).max(20).messages({ "any.required": "Por favor ingrese un nombre", "string.empty": "Por favor ingrese un nombre", "string.min": "Por favor ingrese al menos 3 caracteres", "string.max": "Por favor ingrese como máximo 20 caracteres", }),
  email: Joi.string().allow("").required().email({ minDomainSegments: 2 }).messages({ "any.required": "Por favor ingrese un email", "string.empty": "Por favor ingrese un email", "string.email": "Por favor ingrese un email valido", }),
  password: Joi.string().allow("").required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({
    "any.required": "Por favor ingrese una contraseña",
    "string.empty": "Por favor ingrese una contraseña",
    "string.min": "La contraseña debe tener al menos 8 caracteres",
    "string.pattern.base": "La contraseña debe contener una mayúscula, una minúscula y un número",
  }),

  plan: Joi.string().required(),
  mp_preapproval_id: Joi.string().allow("", null).optional(),
  paymentCreated: Joi.any().optional(),

  is_active: Joi.any().required(),
  is_online: Joi.any().required(),

  //menuData
  photo: Joi.string().uri().optional().messages({ "string.uri": "Ingresa una foto válida.", }),
  photoId: Joi.string().allow("", null).optional().messages({ "string.empty": "Photo ID required", }),
  cover: Joi.string().uri().optional().messages({ "string.uri": "Ingresa una portada válida.", }),
  coverId: Joi.string().allow("", null).optional().messages({ "string.empty": "Cover ID required", }),
  schedule: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese un horario", "string.min": "Por favor ingrese al menos 5 caracteres", "string.max": "Por favor ingrese como máximo 30 caracteres", }),
  phone: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese un número de teléfono", "string.min": "Por favor ingrese al menos 7 caracteres", "string.max": "Por favor ingrese como máximo 10 caracteres", }),
  location: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese una dirección", "string.min": "Por favor ingrese al menos 5 caracteres", "string.max": "Por favor ingrese como máximo 20 caracteres", }),
  description: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese una descripción", "string.min": "Por favor ingrese al menos 5 caracteres", "string.max": "Por favor ingrese como máximo 30 caracteres", }),
  instagram: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese un Instagram", }),
  tiktok: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese un Tiktok", }),
  facebook: Joi.string().allow("", null).optional().messages({ "string.empty": "Por favor ingrese un Facebook", }),

  //menuConfig
  template_id: Joi.string().optional().default("default").messages({ "string.empty": "Por favor ingrese un template_id", }),
  navBar: Joi.number().optional().default(0).messages({ "number.empty": "Por favor ingrese un navBar", }),
  menuConfig: Joi.number().optional().default(0).messages({ "number.empty": "Por favor ingrese un menuConfig", }),
  multipleStores: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Por favor ingrese un multipleStores", }),
  deliveryZones: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Por favor ingrese un deliveryZones", }),
  delivery: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Por favor ingrese un delivery", }),
  paymentOptions: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Por favor ingrese un paymentOptions", }),
  whatsAppCart: Joi.boolean().optional().default(false).messages({ "boolean.empty": "Por favor ingrese un whatsAppCart", }),
  productsVisibilityPay: Joi.boolean().required().default(false).messages({ "any.required": "Por favor ingrese un productsVisibilityPay", "boolean.empty": "Por favor ingrese un productsVisibilityPay", }),

  /*   is_verified: Joi.boolean().default(false),
    verify_code: Joi.string().allow("", null),
    notifications: Joi.any(), */
});

export const userSignIn = Joi.object({ email: Joi.string().required().email({ minDomainSegments: 2 }).messages({ "any.required": "Ingresa un email", "string.empty": "Ingresa un email", "string.email": "Ingresa un email valido", }), password: Joi.string().required().messages({ "any.required": "Ingresa una contraseña", "string.empty": "Ingresa una contraseña", }), });
export const userUpdate = Joi.object({ name: Joi.string().min(3).max(20).messages({ "string.min": "Por favor ingrese al menos 3 caracteres.", "string.max": "Por favor ingrese como máximo 20 caracteres.", }) });
export const userUpdateIsOnline = Joi.object({ is_online: Joi.any().required().messages({ "any.required": "Faltó el estado de la cuenta", "any.empty": "Faltó el estado de la cuenta", }), });
export const userUpdateSubscriptionMp = Joi.object({ mp_preapproval_id: Joi.string().required().messages({ "any.required": "Por favor ingrese un mp_preapproval_id", "string.empty": "Por favor ingrese un mp_preapproval_id", }), mp_subscription_state: Joi.string().required().messages({ "any.required": "Por favor ingrese un mp_subscription_state", "string.empty": "Por favor ingrese un mp_subscription_state", }), mp_subscription_id: Joi.string().required().messages({ "any.required": "Por favor ingrese un mp_subscription_id", "string.empty": "Por favor ingrese un mp_subscription_id", }), });

export const userSendVerification = Joi.object({
  name: Joi.string().required().min(3).max(20).messages({ "any.required": "Por favor ingrese un nombre", "string.empty": "Por favor ingrese un nombre", "string.min": "Por favor ingrese al menos 3 caracteres", "string.max": "Por favor ingrese como máximo 20 caracteres", }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({ "any.required": "Por favor ingrese un email", "string.empty": "Por favor ingrese un email", "string.email": "Por favor ingrese un email valido", }),
  password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).messages({ "any.required": "Por favor ingrese una contraseña", "string.empty": "Por favor ingrese una contraseña", "string.min": "Por favor ingrese al menos 8 caracteres", "string.pattern.base": "La contraseña debe contener una mayúscula, una minúscula y un número", }),
});