import User from "../../models/User.js";
import jwt from "jsonwebtoken";
const signin = async (req, res, next) => {
  const { email } = req.body;
  const $key = process.env.JWT_SECRET_KEY;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }
    const token = jwt.sign(
      { _id: userFound._id, email: userFound.email, role: userFound.role },
      $key,
      { expiresIn: 60 * 60 * 24 } // 1 día
    );
    await User.findByIdAndUpdate(userFound._id, { is_online: true });
    return res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1000,
    }).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        name: userFound.name,
        id: userFound._id,
        email: userFound.email,
        photo: userFound.photo,
        role: userFound.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default signin;