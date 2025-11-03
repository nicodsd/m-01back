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
