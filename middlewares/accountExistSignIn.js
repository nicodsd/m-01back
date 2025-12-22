import User from "../models/User.js";
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
  return res.status(400).json({
    succes: false,
    statusCode: 400,
    message: "User doesn't exist",
  });
}
export default accountExistsSignIn;