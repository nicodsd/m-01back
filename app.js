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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONT_URL_VERCEL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("✅ Origen permitido por CORS:", origin);
      return callback(null, true);
    }
    console.error("❌ Origen RECHAZADO por CORS:", origin);
    return callback(new Error('No permitido por CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
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