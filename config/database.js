import mongoose from "mongoose";
import dns from "node:dns/promises";
import { initChangeStreams } from "../controllers/streamController.js";
dns.setServers(["1.1.1.1"]);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("🔐 database connected");
    initChangeStreams();
  })
  .catch((err) => console.log(err));

export default mongoose;