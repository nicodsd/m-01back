import "dotenv/config.js";
import "./config/database.js";
import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import Visita from "./models/Visita.js";
import indexRouter from "./routes/index.js";
import { __dirname } from "./utils.js";
import cookieParser from 'cookie-parser';
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import sessionConfig from './config/mongoConnect.js';
const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: function (origin, callback) {
    // Permitimos si no hay origen (como apps móviles) o si viene de trycloudflare
    if (!origin || origin.includes("trycloudflare.com") || origin.includes("https://qrmenu-gdhyhdu3t-nicodsds-projects.vercel.app") || origin.includes("http://localhost:3000")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options(/(.*)/, cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//MANEJO DEL MORGAN
/* morgan.token("navegador", (req) => req.headers["user-agent"]);
morgan.token("ip", (req) => req.ip || req.connection.remoteAddress); */
app.use(sessionConfig);
app.use("/", indexRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;