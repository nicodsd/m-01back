import User from "../models/User.js";
export default async function nameAlreadyExist(req, res, next) {
    let user = req.body.name;
    try {
        user = await User.findOne({ name: user });
        if (user) {
            return res.status(409).json({
                message: "Ese nombre ya existe",
            });
        }
    } catch (error) {
        return next(error);
    }
    next();
}