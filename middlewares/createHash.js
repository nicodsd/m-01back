import bcryptjs from "bcryptjs";
async function createHash(req, res, next) {
    try {
        const { password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        req.body.password = hashedPassword;
        return next();
    } catch (error) {
        console.error("Error en el proceso de createHash:", error);
        return next(error);
    }
}
export default createHash