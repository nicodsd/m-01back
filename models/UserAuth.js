import { Schema, model } from "mongoose";
let schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
    },
    is_online: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
let collection = "users";
let User = model(collection, schema);
export default User;