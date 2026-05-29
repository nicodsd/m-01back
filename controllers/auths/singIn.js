import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const $key = process.env.JWT_SECRET_KEY;

export default async function signin(req, res, next) {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!userFound) {
      return res.status(401).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    // Verificación de email
    if (!userFound.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Debes verificar tu correo electrónico.",
      });
    }

    // Activar usuario online
    userFound.is_online = true;
    await userFound.save();

    // Buscar menú existente
    let menus = await Menu.find({
      user_id: userFound._id,
    });

    // Crear menú automáticamente si no existe
    if (!menus) {
      let menu = new Menu({
        user_id: userFound._id,
        template_id: "default",
        photo:
          "https://res.cloudinary.com/dsruux0wb/image/upload/v1777043297/user-logo/jcy4ujuqyiuii3ldt0rk.png",
        cover:
          userFound.plan !== "free"
            ? "https://res.cloudinary.com/dsruux0wb/image/upload/v1777142062/user-cover/Mask_group_v7dp7q.png"
            : "",
        photoId: "",
        coverId: "",
        location: "",
        description: "",
        phone: "",
        instagram: "",
        tiktok: "",
        facebook: "",
        navBar: 0,
        menuEnlisted: 1,
        menuConfig: 0,
        multipleStores: false,
        deliveryZones: false,
        delivery: false,
        paymentOptions: false,
        whatsAppCart: true,
        productsVisibilityPay: false,
      });

      await menu.save();

      // Vincular menú al usuario
      userFound.active_menu_id = menu._id;
      await userFound.save();
    }

    // Generar JWT
    const token = jwt.sign(
      {
        _id: userFound._id,
        email: userFound.email,
        plan: userFound.plan,
      },
      $key,
      {
        expiresIn: "24h",
      }
    );

    const user = {
      id: userFound._id,
      name: userFound.name,
      plan: userFound.plan,
      email: userFound.email,
      is_online: userFound.is_online,
      is_active: userFound.is_active,
      active_menu_id: menus[0]._id
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        status: 200,
        message: "Inicio de sesión exitoso",
        token,
        user,
        menus,
      });
  } catch (error) {
    next(error);
  }
}
