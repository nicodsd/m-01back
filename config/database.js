import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("🔐 database connected"))
  .catch((err) => console.log(err));

export default mongoose;