import User from "../../models/UserAuth.js";
export default async function updateTemplate(req, res, next) {
    try {
        const { id } = req.params;
        const { template_id } = req.body;
        const user = await User.findByIdAndUpdate(id, { template_id }, {
            new: true,
            runValidators: true,
        });
        if (!user) return next(new Error("Usuario no encontrado"));
        res.status(200).json({
            success: true,
            user: user,
        });
    } catch (error) {
        next(error);
    }
}