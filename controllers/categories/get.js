import Category from "../../models/Category.js"
import SubCategory from "../../models/SubCategory.js"
import createHttpError from "http-errors"
let readCategory = async (req, res, next) => {
    try {
        if (req.query.user_id) {
            let all = await Category.find({ user_id: req.query.user_id })
            if (all.length > 0) {
                return res.status(200)
                    .json({
                        categories: all
                    })
            }
            return next(createHttpError(404, "❌ El recurso no se encontró"))
        }
        let all = await Category.find()
        if (all.length > 0) {
            return res.status(200)
                .json({
                    categories: all
                })
        }
        return next(createHttpError(404, "❌ El recurso no se encontró"))
    } catch (error) {
        console.log(error)
        next(error)
    }
}
let readSubCategory = async (req, res, next) => {
    try {
        if (req.query.user_id) {
            let all = await SubCategory.find({ user_id: req.query.user_id })
            if (all.length > 0) {
                return res.status(200)
                    .json({
                        subCategories: all
                    })
            }
            return next(createHttpError(404, "❌ El recurso no se encontró"))
        }
        let all = await SubCategory.find()
        if (all.length > 0) {
            return res.status(200)
                .json({
                    subCategories: all
                })
        }
        return next(createHttpError(404, "❌ El recurso no se encontró"))
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export { readCategory, readSubCategory };