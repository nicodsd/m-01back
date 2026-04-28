//IMPORTS
import express from "express";
import signUp from "../controllers/auths/singUp.js";
import signin from "../controllers/auths/singIn.js";
import signout from "../controllers/auths/singOut.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";
import emailAlreadyExist from "../middlewares/emailAlreadyExist.js";
import validatePassword from "../middlewares/validatePassword.js";
import accountExistsEmailSignIn from "../middlewares/accountExistSignIn.js";
import accountIsoline from "../middlewares/accountIsOnline.js";
import createHash from "../middlewares/createHash.js";
import formIdable from "../middlewares/form-idable.js";
import { cloudinaryUploadMiddlewareById } from "../middlewares/upToCloudinary.js";
import nameAlreadyExist from "../middlewares/userNameAlreadyExist.js";
import updateUser from "../controllers/payAuth/updateUser.js";
import isOnline from "../controllers/auths/isOnline.js"
import { createSubscription } from "../controllers/subscriptionController.js";
import { userSignUp, userSignIn, userUpdate, userUpdateIsOnline } from "../schemas/auths.js";
import rateLimit from "express-rate-limit";
import { checkSession } from "../controllers/auths/$get-sessions.js";
const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // Ventana de 10 minutos
  max: 10, // Solo 10 intentos de login/registro por ventana
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Demasiados intentos. Por favor, intenta de nuevo en 10 minutos."
    });
  }
});
//INITIALIZE
const router = express.Router();
//ENDPOINTS AUTH - REGISTER, LOGIN, LOGOUT
router.get(
  "/check-session",
  authLimiter,
  checkSession,
);
router.post(
  "/signup",
  authLimiter,
  formIdable,
  nameAlreadyExist,
  emailAlreadyExist,
  createHash,
  cloudinaryUploadMiddlewareById,
  validator(userSignUp),
  signUp,
);
router.post(
  "/signin",
  authLimiter,
  formIdable,
  accountExistsEmailSignIn,
  accountIsoline,
  validatePassword,
  validator(userSignIn),
  signin,
);
router.post(
  "/signout",
  signout,
);
//ENDPOINTS AUTH - UPDATE
router.put(
  "/update/is_online/:email",
  validator(userUpdateIsOnline),
  isOnline,
);
router.post(
  "/subscribe",
  createSubscription,
);

//ENDPOINTS AUTH - ADMIN
router.post("/admin", signin);
//EXPORT
export default router;