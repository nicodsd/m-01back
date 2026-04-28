// Endpoint: GET /api/auth/check-session
export const checkSession = (req, res) => {
    // Forzamos al navegador a NO cachear esta respuesta
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    if (req.session.tempUserData) {
        return res.json({
            success: true,
            exists: true,
            data: {
                email: req.session.tempUserData.email,
                password: req.session.tempUserData.password,
                plan: req.session.tempUserData.plan,
                name: req.session.tempUserData.name
            }
        });
    } else {
        return res.json({
            success: true,
            exists: false
        });
    }
};