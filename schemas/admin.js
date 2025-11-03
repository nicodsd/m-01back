import Joi from "joi";

export const adminCreate = Joi.object({
  user_id: Joi.any().required().messages({
    "string.empty":
      "The id is not being loaded from the database so it is not readable",
  }),
  name: Joi.string().required().messages({
    "string.empty": "A name is required",
  }),
  last_name: Joi.string().required().messages({
    "string.empty": "A last name is required",
  }),
  code: Joi.string().required().messages({
    "string.empty": "Code is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  email: Joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "An email is required",
    "string.empty": "An email is required",
    "string.email": "Invalid email",
  }),
});
