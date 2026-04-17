const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log("DETALLE ERROR JOI:", error.details.map(d => d.message));
    return res.status(400).json({
      success: false,
      message: error.details.map(d => d.message)
    });
  }
  next();
};
export default validator;