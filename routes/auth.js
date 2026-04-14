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
import updateTemplate from "../controllers/payAuth/updateTemplate.js";
import { userSignUp, userSignIn, userUpdate, userUpdateIsOnline, userTemplateUpdate } from "../schemas/auths.js";
//INITIALIZE
const router = express.Router();
//ENDPOINTS AUTH - REGISTER, LOGIN, LOGOUT
router.post(
  "/signup",
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
  formIdable,
  accountExistsEmailSignIn,
  accountIsoline,
  validatePassword,
  validator(userSignIn),
  signin,
);
router.post("/signout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }).status(200).json({ message: "Sesión cerrada" });
});
//ENDPOINTS AUTH - UPDATE
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  formIdable,
  nameAlreadyExist,
  cloudinaryUploadMiddlewareById,
  validator(userUpdate),
  updateUser,
);
router.put(
  "/update/is_online/:email",
  validator(userUpdateIsOnline),
  isOnline,
);
router.post(
  "/subscribe",
  createSubscription,
);
router.put(
  "/update/template/:id",
  passport.authenticate("jwt", { session: false }),
  validator(userTemplateUpdate),
  updateTemplate,
);

//ENDPOINTS AUTH - ADMIN
router.post("/admin", signin);
//EXPORT
export default router;