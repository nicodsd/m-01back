import User from "../../models/UserAuth.js";
import jwt from "jsonwebtoken";
let $key = process.env.JWT_SECRET_KEY;
export default async function signUp(req, res, next) {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo:
      req?.body?.photo ||
      "https://res.cloudinary.com/dsruux0wb/image/upload/v1766854327/usuarios/p6knwg0l0wcbixzkhzqp.webp",
    cover: req?.body?.cover || "",
    plan: req?.body?.plan || "",
    location: req?.body?.location || "",
    description: req?.body?.description || "",
    phone: req?.body?.phone || "",
    instagram: req?.body?.instagram || "",
    tiktok: req?.body?.tiktok || "",
    facebook: req?.body?.facebook || "",
    is_online: false,
    is_active: false,
    createdAt: new Date(),
    template_id: req?.body?.template_id || "",
  };
  try {
    let newUser = new User(userData);
    await newUser.save();
    await User.findOneAndUpdate({ email: newUser.email }, { is_online: true });
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email, plan: newUser.plan },
      $key,
      { expiresIn: 60 * 60 * 24 },
    );
    let user = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      photo: newUser.photo,
      location: newUser?.location || "",
      description: newUser?.description || "",
      phone: newUser?.phone || "",
      cover: newUser?.cover || "",
      plan: newUser?.plan,
      is_online: newUser.is_online,
      is_active: newUser.is_active,
      instagram: newUser?.instagram || "",
      tiktok: newUser?.tiktok || "",
      facebook: newUser?.facebook || "",
      createdAt: newUser.createdAt,
      template_id: newUser?.template_id || "",
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 1000,
      })
      .json({
        success: true,
        status: 200,
        token,
        user,
        timeStamps: newUser.createdAt,
        message: "Usuario creado exitosamente",
      });
  } catch (error) {
    next(error);
  }
}
