import User from "../models/User.js";
export default async function emailAlreadyExist(req, res, next) {
  let user = req.body.email.toLowerCase();
  try {
    user = await User.findOne({ email: user });
    if (user) {
      return res.status(409).json({
        message: "Ese email ya existe, ¿Quieres iniciar sesión?",
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
}