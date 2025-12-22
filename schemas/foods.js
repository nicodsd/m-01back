import Joi from "joi-oid";

export const foodSchema = Joi.object({
  user_id: Joi.objectId().required().messages({
    "any.required": "Registrate ahora, y comienza a crear tus menús",
    "string.required": "Registrate ahora, y comienza a crear tus menús",
  }),
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
  category: Joi.array()
    .items(Joi.string().messages({
      "string.empty": "Cada categoría debe ser un texto válido",
    }))
    .min(1)
    .required()
    .messages({
      "any.required": "Faltó la categoría",
      "array.min": "Debes seleccionar al menos una categoría",
      "array.base": "Categoría inválida, debe ser un array",
    }),
  sub_category: Joi.string().required().messages({
    "any.required": "Faltó la sub categoría",
    "string.empty": "Faltó la sub categoría",
  }),
});