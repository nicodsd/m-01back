// ROL 1 PAY USER
import { Schema, model, Types } from "mongoose";

let schema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

let collection = "pay_users";

let PayUser = model(collection, schema);

export default PayUser;
