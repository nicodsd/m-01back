import Category from "../../models/Category.js";
import SubCategory from "../../models/SubCategory.js";

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

const createSubCategory = async (req, res, next) => {
  const name = req.body
  try {
    let oneSubCategory = new SubCategory(name);
    await oneSubCategory.save();
    return res.status(201).json({
      name: oneSubCategory,
      success: true,
      timeStamps: oneSubCategory.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export { createCategory, createSubCategory };