import User from "../models/UserAuth.js";
async function accountExistsSignIn(req, res, next) {
  const reqEmail = req.body.email;
  const user = await User.findOne({ email: reqEmail });
  if (user) {
    req.user = {
      id: user._id,
      email: user.email,
      photo: user.photo,
      password: user.password,
      role: user.role,
    };
    return next();
  }
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Usuario no encontrado",
  });
}
export default accountExistsSignIn;