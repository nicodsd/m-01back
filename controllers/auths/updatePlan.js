import User from "../../models/UserAuth.js";

const updatePlan = async (req, res, next) => {
    try {
        const { email, plan, mp_preapproval_id } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email requerido." });
        }

        const updateData = { plan: plan || "free" };
        if (mp_preapproval_id) {
            updateData.mp_preapproval_id = mp_preapproval_id;
            updateData.is_active = true;
        }

        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        return res.status(200).json({ success: true, message: "Plan actualizado con éxito." });
    } catch (error) {
        console.error("Error al actualizar el plan:", error);
        next(error);
    }
};

export default updatePlan;
