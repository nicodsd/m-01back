import formidable from "formidable";

async function formidableMiddlewareFoods(req, res, next) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
        if (err) return next(err);

        const getFirst = (field) => (Array.isArray(field) ? field[0] : field);

        const rawIsPromo = getFirst(fields?.is_promo);
        const is_promo = rawIsPromo === "true" || rawIsPromo === "1" || rawIsPromo === true;

        const rawIsArchived = getFirst(fields?.is_archived);
        const is_archived = rawIsArchived === "true" || rawIsArchived === "1" || rawIsArchived === true;

        const rawIsGlutenFree = getFirst(fields?.is_gluten_free);
        const is_gluten_free = rawIsGlutenFree === "true" || rawIsGlutenFree === "1" || rawIsGlutenFree === true;

        req.body = {
            name: getFirst(fields?.name)?.toString(),
            description: getFirst(fields?.description)?.toString(),
            category: getFirst(fields?.category)?.toString(),
            sub_category: getFirst(fields?.sub_category)?.toString(),
            price: parseInt(getFirst(fields?.price), 10) || 0,
            promo_price: parseInt(getFirst(fields?.promo_price), 10) || 0,
            is_promo: is_promo,
            order: parseInt(getFirst(fields?.order), 10) || 0,
            is_archived: is_archived,
            is_gluten_free: is_gluten_free, // Agregado aquí
        };
        req.files = files;
        next();
    });
}

export default formidableMiddlewareFoods;