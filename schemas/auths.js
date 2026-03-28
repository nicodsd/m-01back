import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().required().min(3).messages({
    "any.required": "Name required",
    "string.empty": "Name required",
    "string.min": "Ingresa al menos 3 caracteres",
  }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "An email is required",
    "string.empty": "An email is required",
    "string.email": "Ingresa un email valido",
  }),

  password: Joi.string().required().min(8).messages({
    "any.required": "Password required",
    "string.empty": "Password required",
    "string.min": "Ingresa al menos 8 caracteres",
  }),

  photo: Joi.string().uri().required().messages({
    "string.uri": "Ingresa una URL válida para la foto.",
  }),
  cover: Joi.string().uri().optional().messages({
    "string.uri": "Ingresa una URL válida para la portada.",
  }),

  phone: Joi.string().allow("", null).optional().messages({
    "string.empty": "Phone required",
  }),
  location: Joi.string().allow("", null).optional().messages({
    "string.empty": "Address required",
  }),
  description: Joi.string().allow("", null).optional().messages({
    "string.empty": "Description required",
  }),
  instagram: Joi.string().allow("", null).optional().messages({
    "string.empty": "Instagram required",
  }),
  tiktok: Joi.string().allow("", null).optional().messages({
    "string.empty": "Tiktok required",
  }),
  facebook: Joi.string().allow("", null).optional().messages({
    "string.empty": "Facebook required",
  }),

  plan: Joi.string().required(),

  is_active: Joi.any().required(),
  is_online: Joi.any().required(),

  is_verified: Joi.boolean().default(false),
  verify_code: Joi.string().allow("", null),
  notifications: Joi.any(),
});

export const userSignIn = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "An email is required",
    "string.empty": "An email is required",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password required",
    "string.empty": "Password required",
  }),
});

export const userUpdate = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    "string.min": "Ingresa al menos 3 caracteres.",
    "string.max": "Ingresa como máximo 20 caracteres.",
  }),
  location: Joi.string().allow("", null).optional().min(5).max(20).messages({
    "string.min": "Ingresa al menos 5 caracteres.",
    "string.max": "Ingresa como máximo 20 caracteres.",
  }),
  description: Joi.string().allow("", null).optional().min(5).max(30).messages({
    "string.min": "Ingresa al menos 5 caracteres.",
    "string.max": "Ingresa como máximo 30 caracteres.",
  }),
  phone: Joi.string().allow("", null).optional().min(10).max(10).messages({
    "string.min": "Ingresa un numero válido.",
    "string.max": "Ingresa un numero válido.",
  }),
  photo: Joi.string().uri().messages({
    "string.uri": "Ingresa una URL válida para la foto.",
  }),
  cover: Joi.string().uri().optional().messages({
    "string.uri": "Ingresa una URL válida para la portada.",
  }),
  instagram: Joi.string().allow("", null).optional().messages({
    "string.uri": "Ingresa una URL válida para Instagram.",
  }),
  tiktok: Joi.string().allow("", null).optional().messages({
    "string.uri": "Ingresa una URL válida para TikTok.",
  }),
  facebook: Joi.string().allow("", null).optional().messages({
    "string.uri": "Ingresa una URL válida para Facebook.",
  }),
});

export const userUpdateIsOnline = Joi.object({
  is_online: Joi.any().required().messages({
    "any.required": "Faltó el estado de la cuenta",
    "any.empty": "Faltó el estado de la cuenta",
  }),
});
