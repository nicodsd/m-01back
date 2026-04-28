//IMPORTS
import express from "express";
import passport from "../middlewares/passport.js";
import validator from "../middlewares/validator.js";
import formIdable from "../middlewares/form-idable.js";
import { cloudinaryUploadMiddlewareById } from "../middlewares/upToCloudinary.js";
import rateLimit from "express-rate-limit";
import read from "../controllers/accessUrl.js"
import { menuInfoUpdate, menuConfigUpdate } from "../schemas/menuJoi.js";
import updateMenuInfo from "../controllers/menu/updateMenuInfo.js";
import updateMenuConfig from "../controllers/menu/updateMenuConfig.js";
import { userAlreadyExist } from "../middlewares/nameAlreadyExists.js";
const menuLimiter = rateLimit({
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

const router = express.Router();

router.get("/:name", read)
router.put("/update/info/:id",
    passport.authenticate("jwt", { session: false }),
    formIdable,
    userAlreadyExist,
    cloudinaryUploadMiddlewareById,
    validator(menuInfoUpdate),
    updateMenuInfo
);
router.put("/update/config/:id",
    passport.authenticate("jwt", { session: false }),
    validator(menuConfigUpdate),
    updateMenuConfig
);

//EXPORT
export default router;