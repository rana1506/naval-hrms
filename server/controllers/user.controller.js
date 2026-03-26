import User from "../models/User.js";
import { ROLES } from "../config/roles.js";

// XO approves officers
export const approveOfficer = async (req, res) => {
  try {
    const officer = await User.findById(req.params.id);

    if (!officer || officer.status !== "pending")
      return res.status(404).json({ message: "Officer not found or not pending" });

    // XO assigns official officer roles (passed in request body)
    const { roles } = req.body;
    if (!roles || !Array.isArray(roles))
      return res.status(400).json({ message: "Provide valid roles array" });

    officer.roles = roles;
    officer.status = "approved";
    await officer.save();

    res.json({ message: "Officer approved successfully", officer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RO approves sailors & assigns department
export const approveSailor = async (req, res) => {
  try {
    const sailor = await User.findById(req.params.id);

    if (!sailor || sailor.status !== "pending")
      return res.status(404).json({ message: "Sailor not found or not pending" });

    const { department } = req.body;
    if (!department)
      return res.status(400).json({ message: "Department required" });

    sailor.department = department;
    sailor.status = "approved";
    await sailor.save();

    res.json({ message: "Sailor approved successfully", sailor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// XO can view all pending officers & sailors
export const getAllPending = async (req, res) => {
  try {
    const pending = await User.find({ status: "pending" }).select("-passwordHash");
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};