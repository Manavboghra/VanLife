import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  date: { type: Date, default: Date.now },
  stars: { type: Number, min: 1, max: 5, required: true },
  payment: { type: Number, default: 0 },
  comment: { type: String }
});

const vanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
  type: { type: String, enum: ["simple", "luxury", "rugged"], required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "Host", required: true },
  reviews: [reviewSchema]
}, { timestamps: true });

export default mongoose.model("Van", vanSchema);
