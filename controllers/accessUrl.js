import Food from "../models/Food.js"
import SubCategory from "../models/SubCategory.js"
import User from "../models/UserAuth.js"
let read = async (req, res, next) => {
    let { id } = req.params
    try {
        let user = await User.findById(id)
        let foods = await Food.find({ user_id: id })
        let categories = await SubCategory.find({ user_id: id })
        let data = {
            name: user.name,
            photo: user.photo,
            foodDescription: foods.description,
            foodName: foods.name,
            foodPrice: foods.price,
            foodImage: foods.image,
            foodCategory: foods.category,
            foodSubCategory: foods.subCategory,
            foodId: foods._id,
            categories
        }
        return res.status(200)
            .json({
                data
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default read 