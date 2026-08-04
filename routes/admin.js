import express from "express";
import agenda from "../config/agenda.js";

const router = express.Router();

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
