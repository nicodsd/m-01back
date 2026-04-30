import User from "../../models/UserAuth.js";

export default async function updateStateSubscriptionMp(req, res) {
    try {
        const authHeader = req.headers['x-webhook-secret'];
        if (authHeader !== process.env.MP_WEBHOOK_SECRET) {
            return res.status(401).json({ message: "No autorizado" });
        }
        const { id: mp_preapproval_id } = req.query;
        const { status: mp_subscription_state, id: mp_subscription_id } = req.body;
        const user = await User.findOneAndUpdate(
            { mp_preapproval_id },
            { mp_subscription_state, mp_subscription_id },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        console.log("Usuario actualizado:", user);
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error al actualizar el estado de la suscripción" });
    }
}