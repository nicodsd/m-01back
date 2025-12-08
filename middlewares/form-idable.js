import formidable from "formidable";
async function formidableMiddleware(req, res, next) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
        if (err) { return next(err); }
        const name = fields.name[0].toString();
        const role = parseInt(fields.role, 10);
        const is_online = fields.is_online === false;
        const is_active = fields.is_active === false;
        const email = fields.email[0].toString();
        const password = fields.password[0].toString();
        req.files = files;
        req.body = { name, role, is_online, is_active, email, password };
        return next();
    });
};
export default formidableMiddleware;