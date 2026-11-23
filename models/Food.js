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
    promo_type: {
      type: String,
      enum: ["percentage", "multiplier", "second_unit", "fixed", null],
      required: false,
      default: null,
    },
    promo_badge: { type: String, required: false, default: null },
    promo_expires_at: { type: Number, required: false, default: null },
    promo_started_at: { type: Number, required: false, default: null },
    promo_buy_qty: { type: Number, required: false, default: null },
    promo_pay_qty: { type: Number, required: false, default: null },
    promo_second_unit_percent: { type: Number, required: false, default: null },
    promo_occasion: { type: String, required: false, default: null },
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    order: { type: Number, required: false, default: 0 },
    photoId: { type: String, required: true },
    is_archived: { type: Boolean, required: false, default: false },
    is_gluten_free: { type: Boolean, required: false, default: false },
    menus: [{ type: Types.ObjectId, ref: "Menu", required: false, default: [] }],
  },
  {
    timestamps: true,
  }
);
let collection = "foods";
let Foods = model(collection, schema);
export default Foods;