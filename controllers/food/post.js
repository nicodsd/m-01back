import User from "../../models/UserAuth.js";
import Food from "../../models/Food.js";
let createFoodByUserId = async (req, res, next) => {
  let {
    photo,
    photoId,
    name,
    description,
    category,
    price,
    sub_category,
    is_promo,
    promo_price,
    order
  } = req.body;

  let user_id = req.params.id;

  try {
    let user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No se encontró el usuario para asignar el plato."
      });
    }

    let foodData = {
      user_id,
      photo,
      photoId,
      name,
      description,
      price,
      is_promo,
      promo_price,
      sub_category,
      category,
      order
    };

    let food = await Food.create(foodData);

    if (food) {
      return res.status(201).json({ Food: food, success: true });
    } else {
      return res.status(400).json({
        success: false,
        message: "No se pudo procesar la creación del plato."
      });
    }

  } catch (error) {
    next(error);
  }
};

export default createFoodByUserId;