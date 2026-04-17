import Food from "../../models/Food.js";
export default async function deleteFood(req, res, next) {
  try {
    const { ids } = req.body;
    const FoodDestroyed = await Food.deleteMany({ _id: { $in: ids } });
    if (!FoodDestroyed) return next(new Error("Comida no encontrada"));
    if (FoodDestroyed) {
      return res.status(200).json({ response: FoodDestroyed });
    } else {
      return res.status(404).json({ response: "not found" });
    }
  } catch (error) {
    next(error);
  }
}
