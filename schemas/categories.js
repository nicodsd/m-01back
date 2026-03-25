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
    name: Joi.string()
        .required()
        .messages({
            "any.required": "Faltó la subcategoría",
            "string.empty": "Faltó la subcategoría",
        }),
});