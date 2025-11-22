import bcryptjs from "bcryptjs";

function validatePassword(req, res, next) {
  const db_pass = req.user.password;
  const form_pass = req.body.password;
  if (bcryptjs.compareSync(form_pass, db_pass)) {
    return next();
  }
  return res.status(400).json({
    succes: false,
    statusCode: 400,
    message: "Wrong credentials!",
  });
}

export default validatePassword;
