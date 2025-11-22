import Joi from "joi";

export const userSignUp = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "An email is required",
    "string.empty": "An email is required",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password required",
    "string.empty": "Password required",
    "string.min": "Password length must be at least 8 characters long",
  }),
  photo: Joi.string().required().uri().messages({
    "any.required": "An URL with your profile picture is required",
    "string.empty": "An URL with your profile picture is required",
    "string.uri": "Please put a valid URL",
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
