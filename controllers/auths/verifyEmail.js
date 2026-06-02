import User from "../../models/UserAuth.js";

const verifyEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({
                success: false,
                message: "Email y código de verificación requeridos."
            });
        }

        // 1. Buscar usuario
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado."
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "El usuario ya está verificado."
            });
        }

        // 2. Validar bloqueo temporal
        if (user.verificationBlockUntil && user.verificationBlockUntil > new Date()) {
            const minutesLeft = Math.ceil((user.verificationBlockUntil - new Date()) / 1000 / 60);
            return res.status(429).json({
                success: false,
                message: `Demasiados intentos fallidos. Intenta nuevamente en ${minutesLeft} minutos.`
            });
        }

        // 3. Validar expiración (24h)
        if (user.verificationExpiresAt && user.verificationExpiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "El código de verificación expiró."
            });
        }

        // 4. Validar código
        if (user.emailVerificationToken !== code) {
            user.verificationAttempts = (user.verificationAttempts || 0) + 1;
            let message = "El código de verificación es inválido.";
            
            if (user.verificationAttempts >= 10) {
                user.verificationBlockUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 min
                user.verificationAttempts = 0;
                message = "Has excedido los 10 intentos. Por favor espera 5 minutos para volver a intentarlo.";
            }

            await user.save();
            return res.status(400).json({
                success: false,
                message: message
            });
        }

        // 5. Activar usuario
        user.isEmailVerified = true;
        user.is_active = true;
        user.verificationAttempts = 0;
        user.verificationBlockUntil = null;
        user.emailVerificationToken = null;
        user.verificationExpiresAt = null;
        user.pendingDeletionAt = null;

        await user.save();

        console.log("✅ Usuario verificado y activado:", user.email);

        // 6. Sincronizar sesión si existe
        if (req.session && req.session.tempUserData && req.session.tempUserData.email === email) {
            req.session.tempUserData.isEmailVerified = true;
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            console.log("✅ Estado de verificación sincronizado en sesión.");
        }

        return res.status(200).json({
            success: true,
            message: "Email verificado correctamente."
        });

    } catch (error) {
        console.error("Error al verificar email:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno al verificar el email."
        });
    }
};

export default verifyEmail;