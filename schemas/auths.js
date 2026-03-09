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

  photo: Joi.any().required().messages({
    "any.required": "Photo required",
  }),
  cover: Joi.any().optional().messages({
    "any.required": "Background required",
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
  location: Joi.string().min(5).max(20).messages({
    "string.min": "Ingresa al menos 5 caracteres.",
    "string.max": "Ingresa como máximo 20 caracteres.",
  }),
  description: Joi.string().min(5).max(30).messages({
    "string.min": "Ingresa al menos 5 caracteres.",
    "string.max": "Ingresa como máximo 30 caracteres.",
  }),
  phone: Joi.string().min(10).max(10).messages({
    "string.min": "Ingresa un numero válido.",
    "string.max": "Ingresa un numero válido.",
  }),
  photo: Joi.string().uri().messages({
    "string.uri": "Ingresa una URL válida para la foto.",
  }),
});
