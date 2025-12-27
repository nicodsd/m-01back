import SubCategory from "../models/SubCategory.js";
import Food from "../models/Food.js";
import User from "../models/User.js";
const nameSubCategoryAlreadyExist = async function (req, res, next) {
    let name = req.body.name;
    let user_id = req.params.user_id;
    try {
        let nameSubCategory = await SubCategory.findOne({ name: name, user_id: user_id });
        if (nameSubCategory) {
            return res.status(409).json({
                message: "Esa categoria ya existe",
            });
        }
    } catch (error) {
        return next(error);
    }
    next();
}

const nameAlreadyExistFood = async function (req, res, next) {
    let name = req.body.name;
    let user_id = req.params.user_id;
    try {
        let nameFood = await Food.findOne({ name: name, user_id: user_id });
        if (nameFood) {
            return res.status(409).json({
                message: "Esa comida ya existe",
            });
        }
    } catch (error) {
        return next(error);
    }
    next();
}

const userAlreadyExist = async function (req, res, next) {
    let name = req.body.name;
    try {
        let nameUser = await User.findOne({ name: name });
        if (nameUser) {
            return res.status(409).json({
                message: "El usuario ya existe",
            });
        }
    } catch (error) {
        return next(error);
    }
    next();
}
export { nameSubCategoryAlreadyExist, nameAlreadyExistFood, userAlreadyExist };