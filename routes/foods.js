import { Router } from "express"
import read from "../controllers/food/get.js"
import createFoodByUserId from "../controllers/food/post.js"
import passport from "../middlewares/passport.js"
import formIdableFoods from "../middlewares/formIdableFoods.js";
import validator from "../middlewares/validator.js";
import { cloudinaryUploadMiddlewareFood } from "../middlewares/upToCloudinary.js";
import { foodSchema } from "../schemas/foods.js";
import { nameAlreadyExistFood } from "../middlewares/nameAlreadyExists.js";
let router = Router()
router.get("/", read)
router.post("/postfood/:user_id", formIdableFoods, passport.authenticate("jwt", { session: false }), nameAlreadyExistFood, validator(foodSchema), cloudinaryUploadMiddlewareFood, createFoodByUserId);
export default router;