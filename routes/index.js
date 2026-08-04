import express from "express";
import categoryRouter from "./categories.js";
import foodRouter from "./foods.js";
import conectedEndpoint from "../middlewares/conectedEndpoints.js";
import userRouter from "./auth.js";
import menuRouter from "./menu.js";
import analyticsRouter from "./analytics.js";
import streamRouter from "./stream.js";
import adminRouter from "./admin.js";
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "MENUS-API",
    subtitle: "BASE DE DATOS",
  });
});
router.use("/auth", conectedEndpoint, userRouter);
router.use("/categories", conectedEndpoint, categoryRouter);
router.use("/foods", conectedEndpoint, foodRouter);
router.use("/menu", conectedEndpoint, menuRouter)
router.use("/analytics", conectedEndpoint, analyticsRouter);
router.use("/stream", streamRouter);
router.use("/admin", adminRouter);
export default router;