import { Router } from "express"
import read from "../controllers/food/get.js"
import createFoodByUserId from "../controllers/food/post.js"
import passport from "../middlewares/passport.js"
import formIdableFoods from "../middlewares/formIdableFoods.js";
import validator from "../middlewares/validator.js";
import cloudinaryUploadMiddleware from "../middlewares/upToCloudinary.js";
import { foodSchema } from "../schemas/foods.js";
let router = Router()
router.get("/", read)
router.post("/postfood", formIdableFoods, passport.authenticate("jwt", { session: false }), cloudinaryUploadMiddleware, /* validator(foodSchema), */ createFoodByUserId);
export default router;