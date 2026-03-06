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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONT_URL_VERCEL,
  process.env.FRONT_URL_VERCEL_BACKUP
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como Postman o apps móviles) 
    // o si el origen está en la lista
    console.log("🚀 Origen que llega:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(limiter);
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