import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js";
import jwt from "jsonwebtoken";
const $key = process.env.JWT_SECRET_KEY;
export default async function signin(req, res, next) {
  const { email } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    let user = {
      id: userFound._id,
      name: userFound.name,
      plan: userFound.plan,
      email: userFound.email,
      is_online: userFound.is_online,
      is_active: userFound.is_active,
    };
    const token = jwt.sign(
      { _id: userFound._id, email: userFound.email, plan: userFound.plan },
      $key,
      { expiresIn: 60 * 60 * 24 }, // 1 día
    );
    await User.findByIdAndUpdate(userFound._id, { is_online: true });
    const menu = await Menu.findOne({ user_id: userFound._id });
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "Menu no encontrado, por favor cree un menu" });
    }
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 1000,
      })
      .json({
        success: true,
        status: 200,
        message: "Inicio de sesión exitoso",
        token,
        user,
        menu
      });
  } catch (error) {
    next(error);
  }
}
