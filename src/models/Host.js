import mongoose from "mongoose";

const hostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  vans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Van" }]
}, { timestamps: true });

export default mongoose.model("Host", hostSchema);
