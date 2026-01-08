import "dotenv/config.js";
import "./config/database.js";
import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import Visita from "./models/Visita.js";
import indexRouter from "./routes/index.js";
import { __dirname } from "./utils.js";
import cookieParser from 'cookie-parser';
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
// Rate Limite, para limitar las peticiones al servidor
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  handler: (req, res) => {
    res.status(429).json({
      error: "Estás intentando muchas veces, espera unos minutos por favor.",
    });
  },
});
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(limiter);
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//MANEJO DEL MORGAN
/* morgan.token("navegador", (req) => req.headers["user-agent"]);
morgan.token("ip", (req) => req.ip || req.connection.remoteAddress); */
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", indexRouter);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;