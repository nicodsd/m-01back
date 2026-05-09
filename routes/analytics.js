import express from "express";
import { trackVisit, trackDish, getAnalytics } from "../controllers/analytics/analyticsController.js";
import passport from "../middlewares/passport.js";

const router = express.Router();

// Public routes for visitors to trigger tracking
router.post("/visit", trackVisit);
router.post("/dish", trackDish);

// Protected route for the dashboard (requires login)
router.get("/", passport.authenticate("jwt", { session: false }), getAnalytics);

export default router;
