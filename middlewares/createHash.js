import bcryptjs from "bcryptjs";

export default async function (req, res, next) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    return next();
}
