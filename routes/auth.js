//IMPORTS
import express from "express";
import signUp from "../controllers/auths/singUp.js";
import signin from "../controllers/auths/singIn.js";
import signout from "../controllers/auths/singOut.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";
import emailAlreadyExist from "../middlewares/emailAlreadyExist.js";
import validatePassword from '../middlewares/validatePassword.js';
import accountExistsEmailSignIn from '../middlewares/accountExistSignIn.js';
import accountIsoline from '../middlewares/accountIsOnline.js';
import createHash from '../middlewares/createHash.js';
import formIdable from "../middlewares/form-idable.js";
import uploadToCloudinary from "../middlewares/upToCloudinary.js";
import nameAlreadyExist from "../middlewares/userNameAlreadyExist.js";
import updateUser from "../controllers/payAuth/updateUser.js";
import { userSignUp, userSignIn, userUpdate } from "../schemas/auths.js";
//INITIALIZE
const router = express.Router();
//ENDPOINTS AUTH - REGISTER, LOGIN, LOGOUT
router.post("/signup", formIdable, nameAlreadyExist, emailAlreadyExist, createHash, uploadToCloudinary, validator(userSignUp), signUp);
router.post("/signin", formIdable, accountExistsEmailSignIn, accountIsoline, validatePassword, validator(userSignIn), signin);
router.post("/signout", passport.authenticate("jwt", { session: false }), signout);
//ENDPOINTS AUTH - UPDATE
router.put("/update/:id", passport.authenticate("jwt", { session: false }), formIdable, nameAlreadyExist, uploadToCloudinary, validator(userUpdate), updateUser);
//ENDPOINTS AUTH - ADMIN
router.post("/admin", signin);
//EXPORT
export default router;