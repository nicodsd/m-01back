import Category from "../../models/Categories.js";

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const destroyed = await Category.deleteOne({
      _id: id,
    });
    return res.status(200).json({
      response: destroyed,
    });
  } catch (error) {
    next(error);
  }
};

export default destroy;
