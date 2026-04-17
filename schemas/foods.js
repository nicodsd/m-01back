import Joi from "joi-oid";

export const foodSchema = Joi.object({
  name: Joi.string().required(),
  photo: Joi.string().uri().required(), // Cloudinary debe haber puesto esto ya
  description: Joi.string().min(10).required(),
  price: Joi.number().required(),
  category: Joi.string().allow(null, ""),
  sub_category: Joi.string().required(),
  promo_price: Joi.number().allow(0).optional(),
  is_promo: Joi.boolean().optional(),
  order: Joi.number().allow(null, 0).optional(),
}).unknown(true); // <--- ESTO permite que pasen campos extra como user_id o metadata

export const foodSchemaUpdate = Joi.object({
  name: Joi.string().optional().messages({
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().optional().messages({
    "string.empty": "Faltó la foto",
    "any.invalid": "URL invalid",
  }),
  description: Joi.string().min(5).optional().messages({
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