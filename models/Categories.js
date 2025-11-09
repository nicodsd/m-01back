import { Schema, model } from "mongoose";

const categorieSchema = new Schema(
  {
    name: {type: String, required: true}
  },
  {
    timestamps: true
  }
);

let collection = "categories";
let Categories = model(collection, categorieSchema);

export default Categories;
