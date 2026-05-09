import { Schema, model, Types } from "mongoose";

const analyticsSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    visits: { type: Number, default: 0 },
    topDishes: [{ type: String }],
  },
  { timestamps: true }
);

const Analytics = model("analytics", analyticsSchema);
export default Analytics;
