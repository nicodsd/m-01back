import express from "express";
import agenda from "../config/agenda.js";
import UserAuth from "../models/UserAuth.js";

const router = express.Router();

// GET /admin/users
router.get("/users", async (req, res) => {
    try {
        const users = await UserAuth.find({}, "name email role is_active").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ success: false, message: "Error interno" });
    }
});

// POST /admin/campaigns
router.post("/campaigns", async (req, res) => {
    try {
        const { subject, htmlContent } = req.body;
        
        if (!subject || !htmlContent) {
            return res.status(400).json({ success: false, message: "Missing subject or htmlContent" });
        }

        // Schedule the job for immediate execution in the background
        await agenda.now('send-marketing-campaign', { subject, htmlContent });
        
        return res.status(200).json({ success: true, message: "Campaña encolada para envío." });
    } catch (error) {
        console.error("Error creating campaign:", error);
        return res.status(500).json({ success: false, message: "Error interno" });
    }
});

export default router;
