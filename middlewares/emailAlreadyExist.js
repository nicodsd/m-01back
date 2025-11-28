import User from "../models/User.js";
export default async function userAlreadyExist(req, res, next) {
  let user = req.body.email;
  try {
    user = await User.findOne({ email: user });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
}