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
const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: [process.env.FRONTEND_URL, "https://www.qmenu.digital"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.options(/(.*)/, cors());
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//MANEJO DEL MORGAN
/* morgan.token("navegador", (req) => req.headers["user-agent"]);
morgan.token("ip", (req) => req.ip || req.connection.remoteAddress); */
app.use(morgan("dev"));
app.use(express.json());
app.use("/", indexRouter);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;