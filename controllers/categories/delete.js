import Category from "../../models/Category.js";
const destroy = async (req, res, next) => {
  const { name } = req.params;
  try {
    const destroyed = await Category.deleteOne({ name: name });
    return res.status(200).json({ response: destroyed });
  } catch (error) {
    next(error);
  }
};
export default destroy;