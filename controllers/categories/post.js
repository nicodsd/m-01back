import Category from "../../models/Categories.js";

const createCategory = async (req, res, next) => {
  const name = req.body

  try {
    let oneCategory = new Category(name);
    await oneCategory.save();
    return res.status(201).json({
      name: oneCategory,
      success: true,
      timeStamps: oneCategory.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export default createCategory;