import { Schema, model } from "mongoose";

const visitaSchema = new Schema(
  {
    ip: String,
    fecha: { type: Date, default: Date.now },
    metodo: String,
    navegador: String,
    dispositivo: String,
    status: Number,
  },
  {
    timestamps: true,
  }
);

let visit = "visits";
let Visits = model(visit, visitaSchema);

export default Visits;
