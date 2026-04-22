import Joi from "joi-oid";

export const foodSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Faltó el nombre del plato",
    "string.required": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().required().messages({
    "string.empty": "Faltó la foto",
    "any.invalid": "URL invalid",
    "string.uri": "URL invalid",
  }),
  description: Joi.string().min(5).max(25).required().messages({
    "string.required": "Faltó la descripción del plato",
    "string.min": "La descripción del plato es muy corta",
    "string.max": "La descripción del plato es muy larga",
  }),
  price: Joi.number().required().max(1000000).messages({
    "string.empty": "Faltó el precio",
    "number.required": "Faltó el precio",
    "number.max": "El precio es muy alto",
  }),
  category: Joi.string().allow(null, "").messages({
    "string.empty": "Faltó la categoría",
  }),
  sub_category: Joi.string().required().messages({
    "string.empty": "Faltó la sub categoría",
  }),
  promo_price: Joi.number().allow(0).optional(),
  is_promo: Joi.boolean().optional(),
  order: Joi.number().allow(null, 0).optional(),
}).unknown(true); // <--- ESTO permite que pasen campos extra como user_id o metadata

export const foodSchemaUpdate = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().optional().messages({
    "any.invalid": "Imagen inválida",
    "string.uri": "Imagen inválida",
  }),
  description: Joi.string().min(5).max(25).optional().messages({
    "string.min": "La descripción del plato es muy corta",
    "string.max": "La descripción del plato es muy larga",
  }),
  price: Joi.number().optional().max(1000000).messages({
    "number.max": "El precio es muy alto",
  }),
  category: Joi.string().optional(),
  sub_category: Joi.string().optional(),
  promo_price: Joi.number().allow(0).optional(),
  is_promo: Joi.boolean().optional(),
  order: Joi.number().allow(null, 0).optional(),
}).unknown(true);

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