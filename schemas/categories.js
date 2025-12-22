import Joi from "joi-oid";

export const categorySchema = Joi.object({
    user_id: Joi.objectId().required().messages({
        "any.required": "Registrate ahora, y comienza a crear tus menús",
        "string.required": "Registrate ahora, y comienza a crear tus menús",
    }),
    name_category: Joi.string().required().messages({
        "any.required": "Faltó la categoría",
        "string.empty": "Faltó la categoría",
    }),
});

export const categorySchemaUpdate = Joi.object({
    name_category: Joi.string().messages({
        "any.required": "Faltó la categoría",
        "string.empty": "Faltó la categoría",
    }),
});

export const subCategorySchema = Joi.object({
    user_id: Joi.objectId().required().messages({
        "any.required": "Registrate ahora, y comienza a crear tus menús",
        "string.required": "Registrate ahora, y comienza a crear tus menús",
    }),
    names_sub_category: Joi.array()
        .items(Joi.string().messages({
            "string.empty": "Cada subcategoría debe ser un texto válido",
        }))
        .min(1)
        .required()
        .messages({
            "any.required": "Faltó la subcategoría",
            "array.min": "Debes seleccionar al menos una subcategoría",
            "array.base": "Subcategoría inválida, debe ser un array",
        }),
});