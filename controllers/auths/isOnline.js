import User from "../../models/UserAuth.js";
export default async function isOnline(req, res, next) {
    try {
        const { email } = req.params;
        const updates = req.body.is_online === "true" ? true : false;
        const user = await User.findOneAndUpdate({ email }, { is_online: updates }, {
            new: true,
            runValidators: true,
        });

        if (!user) return next(new Error("Usuario no encontrado"));
        res.status(200).json({
            success: true,
            user: user,
            message: "Sesión cerrada con éxito",
        });
    } catch (error) {
        next(error);
    }
}