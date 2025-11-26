import User from "../../models/User.js";
export default async function signUp(req, res, next) {
  try {
    let newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({
      user: newUser,
      success: true,
      timeStamps: newUser.createdAt,
      message: "Usuario creado exitosamente",
    });
  } catch (error) {
    next(error);
  }
}