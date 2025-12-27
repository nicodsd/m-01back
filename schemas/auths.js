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
  photo: Joi.string().required().uri().messages({
    "any.required": "Photo required",
    "string.empty": "Photo required",
    "string.uri": "Invalid photo",
  }),
  role: Joi.number().required(),
  is_active: Joi.boolean().required(),
  is_online: Joi.boolean().required(),
  is_verified: Joi.boolean(),
  verify_code: Joi.string(),
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
  name: Joi.string().min(3).messages({
    "string.min": "Ingresa al menos 3 caracteres",
  }),
  photo: Joi.string().uri().messages({
    "string.uri": "Invalid photo",
  }),
});