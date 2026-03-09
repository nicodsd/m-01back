const notFoundHandler = (req, res, next) => {
    if (req.accepts('html')) {
        return res.redirect(process.env.FRONTEND_URL || 'https://qmenu.digital');
    }
    res.status(404).json({
        status: 404,
        error: "La ruta de API solicitada no existe."
    });
};
export default notFoundHandler