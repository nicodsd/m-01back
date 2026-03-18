import formidable from "formidable";

async function formidableMiddleware(req, res, next) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    const body = {};

    const getFieldValue = (field) =>
      fields[field] ? fields[field][0].toString() : undefined;

    const textFields = [
      "name",
      "plan",
      "location",
      "description",
      "phone",
      "email",
      "password",
    ];

    textFields.forEach((field) => {
      const value = getFieldValue(field);
      if (value !== undefined) body[field] = value;
    });

    if (fields.is_online !== undefined)
      body.is_online =
        fields.is_online[0] === "true" || fields.is_online[0] === "1";
    if (fields.is_active !== undefined)
      body.is_active =
        fields.is_active[0] === "true" || fields.is_active[0] === "1";

    req.files = files;
    req.body = body;
    return next();
  });
}

export default formidableMiddleware;