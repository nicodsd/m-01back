import formidable from "formidable";
async function formidableMiddleware(req, res, next) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
        console.log(fields, files)
        const name = fields?.name?.[0].toString();
        const plan = fields?.plan?.[0].toString();
        const is_online = fields?.is_online === false;
        const is_active = fields?.is_active === false;
        const photo = files?.photo?.[0];
        const cover = files?.cover?.[0];
        const location = fields?.location?.[0].toString();
        const description = fields?.description?.[0].toString();
        const phone = fields?.phone?.[0].toString();
        const email = fields?.email?.[0].toString();
        const password = fields?.password?.[0].toString();
        if (err) { return next(err); }
        if (!plan && !is_online && !is_active && !email && !password) {
            req.files = files;
            req.body = {
                name
            };
            console.log(req.body)
            return next();
        }
        if (!name && !plan && !is_online && !is_active && !photo) {
            req.body = {
                email,
                password
            };
            return next();
        }
        req.files = files;
        req.body = {
            name,
            plan,
            is_online,
            is_active,
            email,
            password,
            photo,
            cover,
            location,
            description,
            phone
        };

        return next();
    });
};
export default formidableMiddleware;