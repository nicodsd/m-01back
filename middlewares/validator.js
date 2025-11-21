const validator = (schema) => [
  (req, res, next) => {
    console.log("Validating request body 111:", req.body);
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      return res.status(400).json({
        success: false,
        message: validation.error.details.map((err) => err.message),
      });
    }

    return next();
  },
];

export default validator;
