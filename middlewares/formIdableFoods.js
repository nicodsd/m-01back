import formidable from "formidable";
async function formidableMiddlewareFoods(req, res, next) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
        //const allergens = fields?.allergens?.[0].toString();
        const name = fields?.name?.[0].toString();
        const description = fields?.description?.[0].toString();
        const category = fields?.category?.[0].toString();
        const price = parseInt(fields?.price, 10);
        const user_id = fields?.user_id?.[0].toString();
        const photo = files?.photo?.[0];
        if (err) { return next(err); }
        req.files = files;
        req.body = { name, description, category, price, user_id, photo };
        console.log(req.body);
        return next();
    });
};
export default formidableMiddlewareFoods;