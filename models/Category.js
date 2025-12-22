import { Schema, model } from "mongoose";
const categorieSchema = new Schema(
  {
    name: { type: String, required: true },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
  },
  {
    timestamps: true,
  }
);
let collection = "categories";
let Categories = model(collection, categorieSchema);
export default Categories;