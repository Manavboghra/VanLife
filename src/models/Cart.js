import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vans: [
    {
      vanId: { type: mongoose.Schema.Types.ObjectId, ref: "Van" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
