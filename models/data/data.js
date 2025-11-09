import "dotenv/config.js";
import "../../config/database.js";
import { categories } from "./categories.js";
import { foods } from "./foods.js";
import Food from "../Food.js";
import Category from "../Categories.js";

let newCategory = async (categories) => await Category.insertMany(categories);
//insertMany es un método de mongoose para insertar muchos documentos en la base de mongo

let newFood = async (foods) => await Food.insertMany(foods);
//insertMany es un método de mongoose para insertar muchos documentos en la base de mongo

let data = async () => {
  await newCategory(categories);
  await newFood(foods);

  console.log("done!");
};
data();
