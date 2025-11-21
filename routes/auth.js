import express from "express";
import signUp from "../controllers/auths/singUp.js";
import signin from "../controllers/auths/singIn.js";
import signout from "../controllers/auths/singOut.js";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";

//import validator from '../middlewares/validator.js';
import { userSignUp, userSignIn } from "../schemas/auths.js";
/* import accountExistsSignUp from '../middlewares/accountSignUp.js';
import accountExistsSignIn from '../middlewares/accountSignIn.js';
import accountHasBeenVerified from '../middlewares/isVerified.js';
import passwordIsOk from '../middlewares/passwordIsOk.js';
import signout from '../controllers/auths/signout.js';
import passport from '../middlewares/passport.js';
import is_admin from '../middlewares/is_admin.js';
import updateAuthor from '../controllers/authors/update.js';
import updateCompany from '../controllers/companies/update.js';
import Multer from '../middlewares/multer.js';
import uploadImg from '../services/firebase.cjs';

const { uploadPhoto } = uploadImg */

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/admins", (req, res, next) =>
  res.status(200).json({
    success: true,
    admins: [],
  })
);

router.post("/signup", validator(userSignUp), signUp);
router.post("/signin", validator(userSignIn), signin);
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  signout
);

//router.put('/role/author/:id', passport.authenticate('jwt', { session: false }), is_admin, updateAuthor)
//router.put('/role/company/:id', passport.authenticate('jwt', { session: false }), is_admin, updateCompany)

export default router;
