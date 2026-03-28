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
  promo_price: Joi.number().optional().messages({
    "string.empty": "Faltó el precio",
  }),
  is_promo: Joi.boolean().optional().messages({
    "boolean.empty": "Faltó el estado de la promo",
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

export const foodSchemaUpdate = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().optional().messages({
    "string.empty": "Faltó la foto",
    "any.invalid": "URL invalid",
  }),
  description: Joi.string().min(10).optional().messages({
    "string.required": "Faltó la descripción del plato",
    "string.min": "La descripción del plato es muy corta",
  }),
  price: Joi.number().optional().messages({
    "string.empty": "Faltó el precio",
  }),
  category: Joi.string().optional().messages({
    "string.empty": "Faltó la categoría",
  }),
  sub_category: Joi.string().optional().messages({
    "string.empty": "Faltó la sub categoría",
  }),
});

export const foodSchemaUpdatPromo = Joi.object({
  promo_price: Joi.number().required().messages({
    "any.required": "Faltó el precio",
    "string.empty": "Faltó el precio",
  }),
  is_promo: Joi.boolean().required().messages({
    "any.required": "Faltó el estado de la promo",
    "boolean.empty": "Faltó el estado de la promo",
  }),
  color_promo: Joi.string().optional().messages({
    "string.empty": "Faltó el color de la promo",
  }),
});