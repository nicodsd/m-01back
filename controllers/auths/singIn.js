import User from "../../models/User.js";
import jwt from "jsonwebtoken";
const $key = process.env.JWT_SECRET_KEY;
export default async function signin(req, res, next) {
  const { email } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }
    let user = {
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      photo: userFound.photo,
      role: userFound.role,
      is_online: userFound.is_online,
      is_active: userFound.is_active,
    };
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
      status: 200,
      message: "Inicio de sesión exitoso",
      token,
      user
    });
  } catch (error) {
    next(error);
  }
}