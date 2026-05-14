import User from "../../models/UserAuth.js";
import bcryptjs from "bcryptjs";

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        if (user.password === hashedPassword) {
            return res.status(400).json({ success: false, message: "Esa contraseña ya la usaste antes. Elige una diferente o" });
        }
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ success: true, message: "Contraseña restablecida correctamente" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error al restablecer la contraseña" });
    }
}

export default resetPassword;