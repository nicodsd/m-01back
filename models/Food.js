import { Schema, model } from "mongoose";

let schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    allergens: { type: Array, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true },
}, {
    timestamps: true
})

let collection = "foods"

let Foods = model(collection, schema)

export default Foods