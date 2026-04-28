// config/email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Crear el transporter
const createTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false, // true para puerto 465, false para 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Contraseña o App Password
        },
    });

    // Verificar conexión al iniciar
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Error conectando con el servidor de correo:', error);
        } else {
            console.log('✅ Servidor de correo listo para enviar mensajes');
        }
    });

    return transporter;
};

export const transporter = createTransporter();