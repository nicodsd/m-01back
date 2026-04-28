// utils/jwtToken.js
import jwt from 'jsonwebtoken';

export const generateEmailVerificationToken = (email, userId) => {
    // El token expira en 24 horas
    return jwt.sign(
        { email, userId, purpose: 'email_verification' },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    );
};

// Verificar token
export const verifyEmailToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return { valid: true, data: decoded };
    } catch (error) {
        return { valid: false, error: error.message };
    }
};