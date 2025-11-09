import Joi from "joi-oid";

export const foodSchema = Joi.object({
  user_id: Joi.objectId().required().messages({
    "any.required": "Registrate ahora, y comienza a crear tus menús",
    "string.required": "Registrate ahora, y comienza a crear tus menús",
  }),
  role: Joi.objectId().required().messages({
    "any.required": "Tiempo de prueba gratuito finalizado",
    "string.empty": "Tiempo de prueba gratuito finalizado",
  }),
  title: Joi.string().required().messages({
    "any.required": "Faltó el nombre del plato",
    "string.empty": "Faltó el nombre del plato",
  }),
  photo: Joi.string()
    .custom((value, helpers) => {
      const regex = /^https?:\/\/storage\.googleapis\.com\/.*$/;

      if (regex.test(value)) {
        return value;
      }

      return helpers.error("any.invalid");
    }, "Firebase URL validation")
    .required()
    .messages({
      "any.required": "URL invalid",
      "string.empty": "Faltó la foto",
      "any.invalid": "URL invalid",
    }),
  description: Joi.string().min(10).required().messages({
    "any.required": "Faltó la descripción del plato",
    "string.required": "Faltó la descripción del plato",
    "string.min": "La descripción del plato es muy corta",
  }),
  category_id: Joi.objectId().required().messages({
    "any.required": "Agregale una categoría",
    "string.empty": "Agregale una categoría",
  }),
});
