import User from "../../models/User.js";
import jwt from "jsonwebtoken";
let signin = async (req, res, next) => {
  const reqEmail = req.body.email;
  const $key = process.env.JWT_SECRET_KEY;
  try {
    let newUser = new User(req.body);
    const token = jwt.sign({ ...newUser._doc }, $key, { expiresIn: 60 * 60 * 24 });
    await User.findOneAndUpdate({ email: reqEmail }, { is_online: true });
    const user = {
      id: req.user.id,
      email: req.user.email,
      photo: req.user.photo,
      role: req.user.role,
    };
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user,
    });
  } catch (error) {
    next(error);
  }
};
export default signin;