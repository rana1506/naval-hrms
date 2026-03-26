import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  serviceNo: { type: String, unique: true, required: true },
  rank: String,
  fullName: String,
  passwordHash: String,

  roles: [{ type: String }],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  department: { type: String, default: null },
  division: { type: mongoose.Schema.Types.ObjectId, ref: "Division", default: null },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);