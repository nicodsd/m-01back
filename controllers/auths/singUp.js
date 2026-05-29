import User from "../../models/UserAuth.js";
import Menu from "../../models/Menu.js";
import jwt from "jsonwebtoken";
const $key = process.env.JWT_SECRET_KEY;

export default async function signUp(req, res, next) {
  // 1. Intentamos obtener datos de la sesión
  const tempData = req.session ? req.session.tempUserData : null;
  const { mp_preapproval_id: preapprovalId } = req.body;

  /**
   * LÓGICA HÍBRIDA: 
   * Priorizamos los datos de la sesión porque son inmutables y seguros,
   * y los aplicamos para planes tanto gratuitos como pagos.
   */
  if (tempData) {
    req.body.name = tempData.name || req.body.name;
    req.body.email = tempData.email || req.body.email;
    req.body.password = tempData.password || req.body.password;
    req.body.plan = tempData.plan || req.body.plan || "free";
  }

  // Validación de seguridad por si ambos (Body y Sesión) fallan
  if (!req.body && !req.session) {
    return res.status(400).json({
      success: false,
      message: "Faltan credenciales obligatorias para el registro."
    });
  }

  try {
    // 2. Preparar el objeto del usuario
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      plan: req.body.plan || "free",
      productsVisibilityPay: req.body.productsVisibilityPay || false,
      mp_preapproval_id: preapprovalId || null,
      is_online: false,
      is_active: preapprovalId ? true : (tempData ? tempData.isEmailVerified : false), // Activo si pagó o si ya validó su email
      isEmailVerified: tempData ? tempData.isEmailVerified : false,
      emailVerificationToken: tempData ? tempData.verificationCode : null,
      codeCreatedAt: new Date(),
      paymentCreated: preapprovalId ? new Date() : null,
      active_menu_id: null
    };

    // 3. Guardar en MongoDB (Lógica híbrida de Upsert/Actualización robusta)
    let newUser = await User.findOne({ email: req.body.email.toLowerCase() });
    if (newUser) {
      newUser.name = userData.name;
      newUser.password = userData.password;
      newUser.plan = userData.plan;
      newUser.productsVisibilityPay = userData.productsVisibilityPay;
      newUser.mp_preapproval_id = userData.mp_preapproval_id;
      newUser.is_online = userData.is_online;

      // Si pagó con Mercado Pago o ya verificó en sesión o base de datos, lo activamos
      newUser.isEmailVerified = newUser.isEmailVerified || userData.isEmailVerified;
      newUser.is_active = preapprovalId ? true : (newUser.isEmailVerified || userData.is_active);

      newUser.paymentCreated = userData.paymentCreated || newUser.paymentCreated;
      if (userData.emailVerificationToken && !newUser.isEmailVerified) {
        newUser.emailVerificationToken = userData.emailVerificationToken;
      }
      await newUser.save();
    } else {
      newUser = new User(userData);
      await newUser.save();
    }

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
      menuEnlisted: 1,
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
    let newMenu = new Menu(menuData);
    await newMenu.save();

    if (!newUser.isEmailVerified && !preapprovalId) {
      return res.status(403).json({
        success: false,
        message: "Debes verificar tu correo antes de iniciar sesión."
      });
    }
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
      codeCreatedAt: req.body.codeCreatedAt,
      paymentCreated: req.body.paymentCreated,
      menu_id: newMenu._id,
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