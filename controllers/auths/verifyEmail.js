import User from "../../models/UserAuth.js";

const verifyEmail = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Código de verificación requerido."
            });
        }

        let verified = false;

        // 1. Buscar usuario por token
        const user = await User.findOne({
            emailVerificationToken: code
        });

        // 2. Validar existencia
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El código de verificación es inválido."
            });
        }

        // 3. Validar expiración
        if (
            user.verificationExpiresAt &&
            user.verificationExpiresAt < new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "El enlace de verificación expiró."
            });
        }

        // 4. Activar usuario
        user.isEmailVerified = true;
        user.is_active = true;

        // Limpiar tokens y expiraciones
        user.emailVerificationToken = null;
        user.verificationExpiresAt = null;
        user.pendingDeletionAt = null;

        await user.save();

        verified = true;

        console.log(
            "✅ Usuario verificado y activado:",
            user.email
        );

        // 5. Sincronizar sesión si existe
        if (
            req.session &&
            req.session.tempUserData &&
            req.session.tempUserData.verificationCode === code
        ) {
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