import jwt from 'jsonwebtoken';
export default function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autorizado' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch {
        return res.status(403).json({ message: 'Token inválido' });
    }
}