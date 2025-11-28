import User from "../../models/User.js";
import jwt from "jsonwebtoken";
let $key = process.env.JWT_SECRET_KEY;
export default async function signUp(req, res, next) {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
    role: req.body.role,
    is_online: false,
    is_active: false,
    createdAt: new Date()
  };
  try {
    let newUser = new User(userData);
    await newUser.save();
    await User.findOneAndUpdate({ email: newUser.email }, { is_online: true });
    const token = jwt.sign({ ...newUser }, $key, { expiresIn: 60 * 60 * 24 });
    let user = {
      name: newUser.name,
      email: newUser.email,
      photo: newUser.photo,
      role: newUser.role,
      is_online: newUser.is_online,
      is_active: newUser.is_active,
      createdAt: newUser.createdAt,
    };
    return res.status(201).cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1000,
    }).json({
      success: true,
      token,
      user,
      timeStamps: newUser.createdAt,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    next(error);
  }
}