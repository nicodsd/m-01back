import "dotenv/config.js";
import "./config/database.js";
import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
/* import mongoose from "mongoose"; */
import cors from "cors";
import Visita from "./models/Visita.js";
import indexRouter from "./routes/index.js";
import { __dirname } from "./utils.js";

const app = express();

// Rate Limite, para limitar las peticiones al servidor

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  handler: (req, res) => {
    res.status(429).json({
      error: "Demaciadas peticiones, intenta más tarde ⛔",
    });
  },
});

app.use(cors());
app.use(limiter);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//MANEJO DEL MORGAN
/* morgan.token("navegador", (req) => req.headers["user-agent"]);
morgan.token("ip", (req) => req.ip || req.connection.remoteAddress); */
// MIDDLEWARES
app.use((req, res, next) => {
  console.log("logged");
  next();
});

app.use(morgan("dev"));
app.use(express.json()); 
app.use("/api", indexRouter);

/* app.get("/visitas", async (req, res) => {
  const visitas = await Visita.find().sort({ fecha: -1 }).limit(100);
  res.json(visitas);
});
app.use(
  morgan(":ip :method :url :status :navegador", {
    stream: {
      write: async (line) => {
        const [ip, metodo, url, status, navegador] = line.trim().split(" ");
        const visita = new Visita({
          ip,
          metodo,
          url,
          status: parseInt(status),
          navegador,
          dispositivo: navegador.includes("Mobile") ? "Móvil" : "Escritorio",
        });
        await visita.save();
      },
    },
  })
); */

export default app;
