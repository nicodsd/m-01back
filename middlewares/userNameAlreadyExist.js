import User from "../models/UserAuth.js";
export default async function nameAlreadyExist(req, res, next) {
    const { name, email } = req.body;
    try {
        let query = { name: name };
        if (email) {
            query.email = { $ne: email.toLowerCase() };
        }
        
        const exists = await User.findOne(query);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Ese nombre ya existe."
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}