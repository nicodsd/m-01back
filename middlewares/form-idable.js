import formidable from "formidable";

async function formidableMiddleware(req, res, next) {
  const form = formidable({ multiples: false, keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) return next(err);

    const body = {};

    // Iteramos sobre todos los campos recibidos dinámicamente
    for (const key in fields) {
      const value = fields[key][0];

      // Conversión de tipos automática
      if (value === "true" || value === "1") body[key] = true;
      else if (value === "false" || value === "0") body[key] = false;
      else body[key] = value;
    }

    if (req.url === "/auth/signup" || req.url === "/menu/create-menu") {
      if (!body.mp_preapproval_id) {
        body.productsVisibilityPay = false;
      } else {
        body.productsVisibilityPay = true;
      }

      if (!body.menuEnlisted) {
        body.menuEnlisted = 0;
      } else {
        body.menuEnlisted = Number(body.menuEnlisted);
      }
    }
    req.files = files;
    req.body = body;
    next();
  });
}

export default formidableMiddleware;