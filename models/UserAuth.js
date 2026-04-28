import { Schema, model } from "mongoose";
let schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    plan: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    is_online: { type: Boolean, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    verificationCode: { type: String },
    codeExpiresAt: { type: Date },
    mp_preapproval_id: { type: String, required: false }
  },
  { timestamps: true }
);
let collection = "users";
let User = model(collection, schema);
export default User;