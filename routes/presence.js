import express from "express";
import { heartbeat, offline } from "../controllers/presenceController.js";

const router = express.Router();

router.post("/heartbeat", heartbeat);
router.post("/offline", offline);

export default router;
