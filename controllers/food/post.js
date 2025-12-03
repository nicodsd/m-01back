import User from '../../models/User.js';
import Food from '../../models/Food.js'
let createFoodByUserId = async (req, res, next) => {
    console.log(req.user)
    console.log(req.body)
    try {
        let { photo, name, description, category, price, allergens } = req.body;
        let user = await User.findOne({ _id: req.user._id });
        if (user) {
            let data = {
                user_id: user._id,
                photo: photo,
                name: name,
                description: description,
                category: category,
                price: price,
                allergens: allergens
            }
            let one = await Food.create(data)
            return res.status(201).json({
                Food: one,
                success: true
            })
        } else {
            return res.status(400).json({
                message: 'Error al crear la comida'
            })
        }
    } catch (error) {
        next(error)
    }
}
export default createFoodByUserId