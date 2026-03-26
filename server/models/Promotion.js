import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  sailorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recommendedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // DO
  recommendationDate: { type: Date, default: Date.now },
  remarks: String
});

export default mongoose.model("Promotion", promotionSchema);