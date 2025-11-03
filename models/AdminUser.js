// ROL 0 ADMIN
import { Schema, model, Types } from "mongoose";

let schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
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

let collection = "admin";

let Admin = model(collection, schema);

export default Admin;
