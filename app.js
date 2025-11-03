import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import Visita from "./models/Visita.js";

const app = express();
app.use(morgan("dev"));

/* app.get('/visitas', async (req, res) => {
  const visitas = await Visita.find().sort({ fecha: -1 }).limit(100)
  res.json(visitas)
}) */

app.get("/", async (req, res) => {
  res.json({ status: 200, mensaje: "hola" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

app.use(cors());

export default app;
