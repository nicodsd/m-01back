import Joi from "joi-oid";

export const foodSchema = Joi.object({
  name: Joi.string().min(5).max(30).required().messages({
    "string.empty": "Faltó el nombre del plato",
    "string.required": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().required().messages({
    "string.empty": "Faltó la foto",
    "any.invalid": "URL inválida",
    "string.uri": "URL inválida",
  }),
  description: Joi.string().min(5).max(50).required().messages({
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
  is_gluten_free: Joi.boolean().optional(), // Agregado aquí
}).unknown(true); // <--- ESTO permite que pasen campos extra como user_id o metadata

export const foodSchemaUpdate = Joi.object({
  name: Joi.string().optional().min(5).max(30).messages({
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string().uri().optional().messages({
    "any.invalid": "Imagen inválida",
    "string.uri": "Imagen inválida",
  }),
  description: Joi.string().min(5).max(50).optional().messages({
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
  is_archived: Joi.boolean().optional(),
}).unknown(true);

export const foodSchemaUpdatPromo = Joi.object({
  promo_price: Joi.number().min(0).required().messages({
    "any.required": "Faltó el precio",
    "number.base": "El precio debe ser un número",
  }),
  is_promo: Joi.boolean().required().messages({
    "any.required": "Faltó el estado de la promo",
    "boolean.base": "El estado de la promo debe ser verdadero o falso",
  }),
  color_promo: Joi.string().allow(null, "").optional().messages({
    "string.empty": "Faltó el color de la promo",
  }),
  promo_type: Joi.string()
    .valid("percentage", "multiplier", "second_unit", "fixed")
    .allow(null, "")
    .optional(),
  promo_badge: Joi.string().max(40).allow(null, "").optional(),
  promo_expires_at: Joi.number().allow(null).optional(),
  promo_started_at: Joi.number().allow(null).optional(),
  promo_buy_qty: Joi.number().integer().min(2).max(20).allow(null).optional(),
  promo_pay_qty: Joi.number().integer().min(1).max(19).allow(null).optional(),
  promo_second_unit_percent: Joi.number().min(1).max(100).allow(null).optional(),
  promo_occasion: Joi.string().max(40).allow(null, "").optional(),
});