import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema({
  name: String,
  divisionalOfficerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sailors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

export default mongoose.model("Division", divisionSchema);