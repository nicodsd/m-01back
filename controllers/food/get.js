import Food from "../../models/Food.js"
import createHttpError from "http-errors"
let read = async (req, res, next) => {
    try {
        if (req.query.user_id) {
            let all = await Food.find({ user_id: req.query.user_id })
            if (all.length > 0) {
                return res.status(200)
                    .json({
                        foods: all
                    })
            }
            return next(createHttpError(404, "❌ El recurso no se encontró"))
        }
        let all = await Food.find()
        if (all.length > 0) {
            return res.status(200)
                .json({
                    foods: all
                })
        }
        return next(createHttpError(404, "❌ El recurso no se encontró"))
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default read 