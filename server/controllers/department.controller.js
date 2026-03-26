import Department from "../models/Department.js";
import User from "../models/User.js";

// Create department
export const createDepartment = async (req, res) => {
  try {
    const { name, headOfficerId } = req.body;

    const exists = await Department.findOne({ name });
    if (exists) return res.status(400).json({ message: "Department exists" });

    const dept = await Department.create({ name, headOfficerId });

    res.json({ message: "Department created", dept });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const depts = await Department.find().populate("headOfficerId");
    res.json(depts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dashboard: sailors in this department
export const getDepartmentSailors = async (req, res) => {
  try {
    const { deptName } = req.params;

    const sailors = await User.find({
      department: deptName,
      roles: { $in: ["sailor"] }
    }).select("-passwordHash");

    res.json(sailors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};