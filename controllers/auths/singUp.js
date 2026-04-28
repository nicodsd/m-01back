import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js";
import jwt from "jsonwebtoken";
import createHash from "../../middlewares/createHash.js";
const $key = process.env.JWT_SECRET_KEY;

export default async function signUp(req, res, next) {
  // 1. Intentamos obtener datos de la sesión (solo existirán si viene de Mercado Pago)
  const tempData = req.session ? req.session.tempUserData : null;
  const { mp_preapproval_id: preapprovalId } = req.body; // Cambié preapproval_id a preapprovalId para coincidir con tu FormData del front

  /**
   * LÓGICA HÍBRIDA: 
   * Si hay sesión activa y un ID de preaprobación, el usuario viene de pagar.
   * Priorizamos los datos de la sesión porque son inmutables y seguros.
   */
  if (tempData && preapprovalId) {
    req.body.name = tempData.name;
    req.body.email = tempData.email;
    req.body.password = tempData.password; // Ya viene hasheada de la sesión previa
    req.body.plan = tempData.plan;
  }

  // Validación de seguridad por si ambos (Body y Sesión) fallan
  if (!req.body && !req.session) {
    return res.status(400).json({
      success: false,
      message: "Faltan credenciales obligatorias para el registro."
    });
  }

  try {
    await createHash(req, res, () => { });
    // 2. Preparar el objeto del usuario
    // Nota: req.body ya contiene name, phone, photo (vía formidable/cloudinary), etc.
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      plan: req.body.plan || "free",
      mp_preapproval_id: preapprovalId || null, // Guardamos el ID de MP si existe
      is_online: true,
      is_active: preapprovalId ? true : false, // Activo inmediatamente si pagó
      createdAt: new Date(),
    };

    // 3. Guardar en MongoDB
    let newUser = new User(userData);
    await newUser.save();

    const menuData = {
      user_id: newUser._id,
      template_id: req.body.template_id || "default",
      photo: req.body.photo || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777043297/user-logo/jcy4ujuqyiuii3ldt0rk.png",
      cover: req.body.plan !== "free" ? req.body.cover || "https://res.cloudinary.com/dsruux0wb/image/upload/v1777142062/user-cover/Mask_group_v7dp7q.png" : "",
      photoId: req.body.photoId || "",
      coverId: req.body.coverId || "",
      location: req.body.location || "",
      description: req.body.description || "",
      phone: req.body.phone || "",
      instagram: req.body.instagram || "",
      tiktok: req.body.tiktok || "",
      facebook: req.body.facebook || "",
      navBar: 0,
      menuConfig: 0,
      multipleStores: false,
      deliveryZones: false,
      delivery: false,
      paymentOptions: false,
      whatsAppCart: true,
      productsVisibilityPay: false,
    }

    if (req.body.photoId) {
      menuData.photoId = req.body.photoId
    }
    if (req.body.coverId) {
      menuData.coverId = req.body.coverId
    }
    menuData.user_id = newUser._id
    let newMenu = new Menu(menuData);
    await newMenu.save();

    // 4. Generar Token JWT
    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email, plan: newUser.plan },
      $key,
      { expiresIn: "24h" }
    );

    // 5. Limpiar la sesión solo si se utilizó para este registro
    if (tempData) {
      req.session.destroy((err) => {
        if (err) console.error("Error al destruir sesión tras registro:", err);
      });
    }

    // 6. Preparar respuesta para el front
    const userResponse = {
      //userData
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      plan: newUser.plan,
      is_online: newUser.is_online,
      is_active: newUser.is_active,
      createdAt: newUser.createdAt,
      //menuData
      photo: newMenu.photo,
      cover: newMenu.cover,
      phone: newMenu.phone,
      instagram: newMenu.instagram,
      tiktok: newMenu.tiktok,
      facebook: newMenu.facebook,
      location: newMenu.location,
      description: newMenu.description,
      template_id: newMenu.template_id,
      navBar: newMenu.navBar,
      menuConfig: newMenu.menuConfig,
      multipleStores: newMenu.multipleStores,
      deliveryZones: newMenu.deliveryZones,
      delivery: newMenu.delivery,
      paymentOptions: newMenu.paymentOptions,
      whatsAppCart: newMenu.whatsAppCart,
      productsVisibilityPay: newMenu.productsVisibilityPay,
    };

    // 7. Enviar Cookie y Respuesta
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        token,
        user: userResponse,
        message: preapprovalId
          ? "Suscripción y registro completados con éxito"
          : "Registro gratuito completado con éxito",
      });

  } catch (error) {
    console.error("Error en el proceso de registro:", error);
    next(error);
  }
}