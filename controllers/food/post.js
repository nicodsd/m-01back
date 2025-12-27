import User from '../../models/User.js';
import Food from '../../models/Food.js';
import SubCategory from '../../models/SubCategory.js';
let createFoodByUserId = async (req, res, next) => {
    try {
        let { photo, name, description, category, price, sub_category } = req.body;
        let user_id = req.params.user_id;
        console.log("user_id", user_id);
        console.log("req.body", req.body);
        let user = await User.findOne({ _id: user_id });
        if (user) {
            let foodData = {
                user_id,
                photo,
                name,
                description,
                price,
                sub_category: "",
                category
            };
            let existingCat = await SubCategory.findOne({ name: sub_category, user_id: user_id });
            if (existingCat) {
                foodData.sub_category = existingCat.name;
            } else {
                let newCat = await SubCategory.create({
                    name: sub_category,
                    user_id: user_id,
                    foods: [],
                });
                await newCat.save();
                foodData.sub_category = newCat.name;
            }
            let food = await Food.create(foodData);
            if (food) {
                return res.status(201).json({
                    Food: food,
                    success: true,
                });
            } else {
                return res.status(400).json({
                    message: 'Error al crear la comida',
                });
            }
        }
    } catch (error) {
        next(error);
    }
};
export default createFoodByUserId;