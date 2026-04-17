import { Router } from "express";
import updateFood from "../controllers/food/edit.js";
import deleteFood from "../controllers/food/delete.js";
import read from "../controllers/food/get.js";
import createFoodByUserId from "../controllers/food/post.js";
import passport from "../middlewares/passport.js";
import formIdableFoods from "../middlewares/formIdableFoods.js";
import validator from "../middlewares/validator.js";
import { cloudinaryUploadMiddlewareFood } from "../middlewares/upToCloudinary.js";
import { foodSchema, foodSchemaUpdate, foodSchemaUpdatPromo } from "../schemas/foods.js";
import { nameAlreadyExistFood } from "../middlewares/nameAlreadyExists.js";
import updateOrder from "../controllers/payAuth/updateOrder.js";
let router = Router();
router.get("/", read);
router.post(
  "/postfood/:id",
  passport.authenticate("jwt", { session: false }),
  formIdableFoods,
  nameAlreadyExistFood,
  cloudinaryUploadMiddlewareFood,
  validator(foodSchema),
  createFoodByUserId
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  formIdableFoods,
  cloudinaryUploadMiddlewareFood,
  validator(foodSchemaUpdate),
  updateFood,
);
router.delete(
  "/delete-multiple",
  passport.authenticate("jwt", { session: false }),
  deleteFood,
);
router.put(
  "/promo/:id",
  passport.authenticate("jwt", { session: false }),
  validator(foodSchemaUpdatPromo),
  updateFood,
)
router.put(
  "/update-order",
  passport.authenticate("jwt", { session: false }),
  updateOrder,
);
export default router;