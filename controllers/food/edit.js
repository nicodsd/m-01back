import Food from "../../models/Food.js";
export default async function updateFood(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const food = await Food.findByIdAndUpdate(id, updates, {
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
