import Food from "../models/Food.js"
import SubCategory from "../models/SubCategory.js"
import User from "../models/UserAuth.js"
let read = async (req, res, next) => {
    let { name } = req.params
    name = name.replace(/-/g, " ")
    try {
        let user = await User.findOne({ name: name })
        let foods = await Food.find({ user_id: user._id })
        let categories = await SubCategory.find({ user_id: user._id })
        let data = {
            name: user.name,
            photo: user.photo,
            foods,
            categories
        }
        return res.status(200)
            .json({
                data
            })
    } catch (error) {
        next(error)
    }
}
export default read 