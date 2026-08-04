import express from "express";
import { streamMetrics } from "../controllers/streamController.js";

const router = express.Router();

router.get("/metrics-stream", streamMetrics);

export default router;
