import express from "express";
import { streamMetrics } from "../controllers/streamController.js";
import { streamOnlineUsersProtected } from "../controllers/presenceController.js";

const router = express.Router();

router.get("/metrics-stream", streamMetrics);
router.get("/online-users", streamOnlineUsersProtected);

export default router;
