import { Schema, model, Types } from "mongoose";
let schema = new Schema(
  {
    photo: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true },
    price: { type: Number, required: true },
    user_id: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);
let collection = "foods";
let Foods = model(collection, schema);
export default Foods;