import { Schema, model, Types } from "mongoose";
let schema = new Schema(
  {
    photo: { type: String, required: true },
    is_promo: { type: Boolean, required: false, default: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: false },
    sub_category: { type: String, required: true },
    price: { type: Number, required: true },
    promo_price: { type: Number, required: false, default: 0 },
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    order: { type: Number, required: false, default: 0 },
    photoId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
let collection = "foods";
let Foods = model(collection, schema);
export default Foods;