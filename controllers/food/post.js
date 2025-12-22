import User from '../../models/User.js';
import Food from '../../models/Food.js';
import Category from '../../models/Category.js';
let createFoodByUserId = async (req, res, next) => {
    try {
        let { photo, name, description, category, price, user_id, allergens, sub_category } = req.body;
        let user = await User.findOne({ _id: user_id });
        if (user) {
            // Crear la comida
            let foodData = {
                user_id: user_id,
                photo,
                name,
                description,
                price,
                //allergens,
                category,
                sub_category
            };
            let food = await Food.create(foodData);
            if (food) {
                // Iterar sobre cada categoría recibida
                for (let cat of category) {
                    // Buscar si ya existe la categoría
                    let existingCat = await Category.findOne({ name: cat });

                    if (existingCat) {
                        // Si existe, agregar el food_id
                        existingCat.foods.push(food._id);
                        await existingCat.save();
                    } else {
                        // Si no existe, crearla y vincular el food
                        let newCat = await Category.create({
                            name: cat,
                            foods: [food._id],
                        });
                        await newCat.save();
                    }
                }
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