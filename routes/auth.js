//IMPORTS
import express from "express";
import signUp from "../controllers/auths/singUp.js";
import signin from "../controllers/auths/singIn.js";
import signout from "../controllers/auths/singOut.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";
import emailAlreadyExist from "../middlewares/emailAlreadyExist.js";
import validatePassword from '../middlewares/validatePassword.js';
import accountExistsSignIn from '../middlewares/accountSignIn.js';
import accountIsoline from '../middlewares/accountIsOnline.js';
import createHash from '../middlewares/createHash.js';
import formIdable from "../middlewares/form-idable.js";
import nameAlreadyExist from "../middlewares/nameAlreadyExist.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import updateUser from "../controllers/payAuth/updateUser.js";
import { userSignUp, userSignIn } from "../schemas/auths.js";
//INITIALIZE
const router = express.Router();
//ENDPOINTS AUTH - REGISTER, LOGIN, LOGOUT
router.post("/signup", formIdable, validator(userSignUp), nameAlreadyExist, emailAlreadyExist, createHash, signUp);
router.post("/signin", validator(userSignIn), accountExistsSignIn, accountIsoline, validatePassword, signin);
router.post("/signout", authMiddleware, passport.authenticate("jwt", { session: false }), signout);
//ENDPOINTS AUTH - UPDATE
router.put("/update/:id", authMiddleware, passport.authenticate("jwt", { session: false }), nameAlreadyExist, updateUser);
//ENDPOINTS AUTH - ADMIN
router.post("/admin", signin);
//EXPORT
export default router;