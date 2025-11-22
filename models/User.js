import { Schema, model } from "mongoose";

let schema = new Schema(
  {
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
      required: true,
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
  },
  {
    timestamps: true,
  }
);

let collection = "users";

let User = model(collection, schema);

export default User;
