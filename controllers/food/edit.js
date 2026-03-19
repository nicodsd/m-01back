import Food from "../../models/Food.js";
export default async function updateFood(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    let food;
    if (updates.is_promo === "true" && updates.promo_price >= 0) {
      updates.is_promo = true;
      updates.price = updates.promo_price;
      food = await Food.findByIdAndUpdate(id, { is_promo: true, price: updates.promo_price }, {
        new: true,
        runValidators: true,
      });
    }
    food = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!food) return next(new Error("Comida no encontrada"));

    res.status(200).json({
      success: true,
      food: food,
    });
  } catch (error) {
    next(error);
  }
}
