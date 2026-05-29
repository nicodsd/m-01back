import User from "../../models/UserAuth.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

const sendVerification = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        // 1. Check if email already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });

        // Generate verification token using bcrypt
        const verificationCode = crypto.randomBytes(32).toString("hex");
        const hashedPassword = await bcryptjs.hash(password, 10);

        if (userExists) {
            // If the user is already verified or active, it's a real duplicate
            if (userExists.isEmailVerified || userExists.is_active) {
                return res.status(409).json({ success: false, message: "Ese email ya existe, ¿Quieres iniciar sesión?" });
            }

            // Otherwise, they are retrying or editing step 0 before completing registration.
            // We update their registration details and issue a new verification code.
            userExists.name = name;
            userExists.password = hashedPassword;
            userExists.emailVerificationToken = verificationCode;
            const verificationExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
            const deletionDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días
            userExists.verificationExpiresAt = verificationExpiration;
            userExists.pendingDeletionAt = deletionDate;
            await userExists.save();
        } else {
            // Create the user in MongoDB as unverified and inactive
            const verificationExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
            const deletionDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

            const newUser = new User({
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                plan: "free",
                is_active: false,
                isEmailVerified: false,
                emailVerificationToken: verificationCode,
                verificationExpiresAt: verificationExpiration,
                pendingDeletionAt: deletionDate,
                is_online: true
            });
            await newUser.save();
        }

        // 2. Save details in the session as well (for same-session seamless wizard experience)
        req.session.tempUserData = {
            email: email.toLowerCase(),
            name,
            verificationCode,
            isEmailVerified: false
        };

        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // 3. Send email with verification link
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });

        const verificationLink = `${process.env.FRONTEND_URL}/validacion-de-cuenta?code=${encodeURIComponent(verificationCode)}`;

        const mailOptions = {
            from: `"QMenú" <${process.env.EMAIL}>`,
            to: email,
            subject: "Verifica tu cuenta - QMenú",
            html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu cuenta - QMenú</title>
</head>
<body style="margin:0; padding:0; background-color:#fffbf8; font-family: Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fffbf8">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); overflow:hidden;">
                    <tr>
                        <td align="center" style="padding: 30px 20px 20px 20px;">
                            <img src="https://res.cloudinary.com/dsruux0wb/image/upload/v1778706736/logo-color_y9fcea.png" 
                                 alt="QMenú" width="100" style="display:block; border:0;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 40px 20px 40px; color:#333333;">
                            <h2 style="margin:0; font-size:26px; font-weight:bold; color:#FF1E00;">¡Hola ${name}!</h2>
                            <p style="margin:20px 0; font-size:15px; line-height:1.5; color:#555555;">
                                Gracias por registrarte en <strong>QMenú</strong>. Para completar tu registro y activar tu cuenta, por favor verifica tu dirección de correo electrónico haciendo clic en el siguiente botón:
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 10px 40px 30px 40px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="#FF1E00" style="border-radius:6px;">
                                        <a href="${verificationLink}" 
                                           target="_blank" 
                                           style="padding: 12px 24px; font-size: 16px; color: #ffffff; font-weight:bold; text-decoration: none; display: inline-block;">
                                            Verificar cuenta
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 40px 30px 40px;">
                            <p style="margin:0; font-size:13px; color:#666666; line-height: 1.4;">
                                Si el botón no funciona, puedes copiar y pegar el siguiente enlace en tu navegador:<br>
                                <a href="${verificationLink}" style="color: #FF1E00; word-break: break-all;">${verificationLink}</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#fffbf8" style="padding: 20px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee;">
                            © ${new Date().getFullYear()} QMenú.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Correo de verificación enviado." });
    } catch (error) {
        console.error("Error al enviar verificación:", error);
        return res.status(500).json({ success: false, message: "Error al enviar el correo de verificación." });
    }
};

export default sendVerification;
