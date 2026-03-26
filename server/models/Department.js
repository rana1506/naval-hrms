import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: String,
  headOfficerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Department", departmentSchema);