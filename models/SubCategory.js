import { Schema, model } from "mongoose";
const subCategorySchema = new Schema(
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
let collection = "subcategories";
let SubCategories = model(collection, subCategorySchema);
export default SubCategories;