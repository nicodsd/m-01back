import User from "../../models/User.js";
import jwt from "jsonwebtoken";

let signin = async (req, res, next) => {
  const reqEmail = req.body.email;
  const $key = process.env.JWT_SECRET_KEY;

  try {
    await User.findOneAndUpdate({ email: reqEmail }, { is_online: true });
    const token = jwt.sign(
      { email: reqEmail },
      $key, //JWT_SECRET_KEY
      { expiresIn: 60 * 60 * 24 }
    ); // 24 horas
    const user = {
      id: req.user.id,
      email: req.user.email,
      photo: req.user.photo,
      role: req.user.role,
    };
    return res.status(200).json({
      success: true,
      message: "User signed in",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export default signin;
