// services/emailService.js
import { transporter } from '../config/email.js';

/**
 * Envía correo de verificación con link
 */
export const sendVerificationEmail = async (to, verificationLink, username) => {
    const mailOptions = {
        from: `"Tu App" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: 'Verifica tu correo electrónico',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>¡Bienvenido ${username || 'usuario'}!</h2>
        <p>Gracias por registrarte. Por favor verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
          Verificar correo
        </a>
        <p>O copia y pega este enlace en tu navegador:</p>
        <p>${verificationLink}</p>
        <p>Este enlace expirará en 24 horas.</p>
        <hr />
        <p style="color: #666; font-size: 12px;">Si no solicitaste este correo, ignóralo.</p>
      </div>
    `,
        text: `Verifica tu correo accediendo a: ${verificationLink}\nEste enlace expirará en 24 horas.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error enviando correo:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Envía código de verificación numérico
 */
export const sendVerificationCode = async (to, code, username) => {
    const mailOptions = {
        from: `"Tu App" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: 'Tu código de verificación',
        html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Código de verificación</h2>
        <p>Hola ${username || 'usuario'},</p>
        <p>Tu código de verificación es:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px;">${code}</h1>
        <p>Este código expirará en 10 minutos.</p>
      </div>
    `,
    };

    return await transporter.sendMail(mailOptions);
};