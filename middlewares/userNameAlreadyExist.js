import User from "../models/UserAuth.js";
export default async function nameAlreadyExist(req, res, next) {
  const { name } = req.body;
    const { id } = req.params;

    try {
        const exists = await User.findOne({ 
            name: name, 
            _id: { $ne: id }
        });

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "El nombre ya está siendo utilizado por otro usuario."
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}