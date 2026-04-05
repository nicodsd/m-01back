import User from "../models/UserAuth.js";
export default async function emailAlreadyExist(req, res, next) {
  let user = req.body.email.toLowerCase();
  try {
    user = await User.findOne({ email: user });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "Ese email ya existe, ¿Quieres iniciar sesión?",
      });
    }
  } catch (error) {
    return next(error);
  }
  return next();
}