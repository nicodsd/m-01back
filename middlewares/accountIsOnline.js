import User from "../models/UserAuth.js";
async function accountIsOnline(req, res, next) {
  const reqEmail = req.body.email;
  let user = await User.findOne({ email: reqEmail });
  if (user.is_online === true) {
    return res.status(409).json({
      succes: false,
      statusCode: 409,
      alreadyLoggedIn: true,
      message:
        "Esta cuenta ya está en uso ¿Quieres iniciar sesión en este dispositivo?",
    });
  }
  next();
}
export default accountIsOnline;
