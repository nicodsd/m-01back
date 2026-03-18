import formidable from "formidable";
async function formidableMiddlewareFoods(req, res, next) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
        const name = fields?.name?.[0].toString();
        const description = fields?.description?.[0].toString();
        const category = fields?.category?.[0].toString();
        const price = parseInt(fields?.price, 10);
        const sub_category = fields?.sub_category?.[0].toString();
        if (err) { return next(err); }
        req.files = files;
        req.body = { name, description, category, price, sub_category };
        return next();
    });
}
export default formidableMiddlewareFoods;