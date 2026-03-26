import mongoose from "mongoose";

const welfareSchema = new mongoose.Schema({
  sailorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issue: String,
  remarks: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // DO ID
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Welfare", welfareSchema);