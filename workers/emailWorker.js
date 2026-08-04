import agenda from "../config/agenda.js";
import User from "../models/UserAuth.js";
import { sendBulkEmails } from "../services/emailService.js";

agenda.define('send-marketing-campaign', async (job, done) => {
    try {
        const { subject, htmlContent } = job.attrs.data;

        // Find users that have opted in and have active email status
        const users = await User.find({
            marketingOptIn: true,
            emailStatus: 'active'
        });

        if (users.length === 0) {
            console.log("No valid users found for the marketing campaign.");
            done();
            return;
        }

        const emails = users.map(user => user.email);

        // Process in batches of 100 for Resend limits
        const BATCH_SIZE = 100;
        for (let i = 0; i < emails.length; i += BATCH_SIZE) {
            const batch = emails.slice(i, i + BATCH_SIZE);
            console.log(`Sending batch ${i / BATCH_SIZE + 1} of ${Math.ceil(emails.length / BATCH_SIZE)}...`);

            const result = await sendBulkEmails(batch, subject, htmlContent);
            if (!result.success) {
                console.error("Batch failure:", result.error);
            }
        }

        console.log(`Campaign sent successfully to ${emails.length} users.`);
        done();
    } catch (error) {
        console.error("Job failed:", error);
        done(error);
    }
});

export default agenda;
