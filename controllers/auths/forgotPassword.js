import UserAuth from "../../models/UserAuth.js";
import { validationResult } from "express-validator";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Joi from "joi";

const validationSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
});

const forgotPassword = async (req, res, next) => {
    try {
        const { error } = validationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { email } = req.body;
        const user = await UserAuth.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        //crear token
        user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
        });
        const mailOptions = {
            from: `"QMenú" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Recuperar contraseña",
            html: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar contraseña - QMenú</title>
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
                            <h2 style="margin:0; font-size:26px; font-weight:bold; color:#FF1E00;">¿Olvidaste tu contraseña?</h2>
                            <p style="margin:20px 0; font-size:15px; line-height:1.5; color:#555555;">
                                Hola, desde <strong>QMenú</strong> recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para continuar:
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 10px 40px 30px 40px;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" bgcolor="#FF1E00" style="border-radius:6px;">
                                        <a href="${process.env.FRONTEND_URL}/restablecer-contrasena?token=${user.resetPasswordToken}&email=${user.email}" 
                                           target="_blank" 
                                           style="padding: 12px 24px; font-size: 16px; color: #ffffff; font-weight:bold; text-decoration: none; display: inline-block;">
                                            Restablecer contraseña
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 0 40px 30px 40px;">
                            <p style="margin:0; font-size:13px; color:#666666; line-height: 1.4;">
                                Si no solicitaste este cambio, puedes ignorar este correo.<br> 
                                Tu contraseña actual seguirá siendo válida.
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
        res.status(200).json({ message: "Correo de recuperación enviado" });
    } catch (error) {
        next(error);
    }
}
export default forgotPassword