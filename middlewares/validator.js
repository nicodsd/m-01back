const validator = (schema) => [
  (req, res, next) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res.status(400).json({
        message: "Validation error",
        success: false,
        errors: validation.error.details.map((detail) => detail.message),
      });
    }
    return next();
  },
];
export default validator;