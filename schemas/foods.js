import Joi from "joi-oid";

export const foodSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Faltó el nombre del plato",
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().required().messages({
    "any.required": "Faltó la foto",
    "string.empty": "Faltó la foto",
    "any.invalid": "URL invalid",
  }),
  description: Joi.string().min(10).required().messages({
    "any.required": "Faltó la descripción del plato",
    "string.required": "Faltó la descripción del plato",
    "string.min": "La descripción del plato es muy corta",
  }),
  price: Joi.number().required().messages({
    "any.required": "Faltó el precio",
    "string.empty": "Faltó el precio",
  }),
  category: Joi.string().required().messages({
    "any.required": "Faltó la categoría",
    "string.empty": "Faltó la categoría",
  }),
  sub_category: Joi.string().required().messages({
    "any.required": "Faltó la sub categoría",
    "string.empty": "Faltó la sub categoría",
  }),
});