import Division from "../models/Division.js";
import User from "../models/User.js";

// Create division (Admin / CO only)
export const createDivision = async (req, res) => {
  try {
    const { name, divisionalOfficerId } = req.body;

    const existing = await Division.findOne({ name });
    if (existing) return res.status(400).json({ message: "Division exists" });

    const division = await Division.create({
      name,
      divisionalOfficerId,
      sailors: []
    });

    res.json({ message: "Division created", division });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GO assigns sailor to division
export const assignSailorToDivision = async (req, res) => {
  try {
    const { sailorId, divisionId } = req.body;

    let sailor = await User.findById(sailorId);
    if (!sailor) return res.status(404).json({ message: "Sailor not found" });

    let division = await Division.findById(divisionId);
    if (!division) return res.status(404).json({ message: "Division not found" });

    // Remove sailor from previous division (if any)
    await Division.updateMany(
      { sailors: sailorId },
      { $pull: { sailors: sailorId } }
    );

    // Add to new division
    division.sailors.push(sailorId);
    await division.save();

    sailor.division = divisionId;
    await sailor.save();

    res.json({ message: "Sailor assigned to division", division });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DO gets sailors of his division
export const getDivisionSailors = async (req, res) => {
  try {
    const userId = req.user._id;

    const division = await Division.findOne({ divisionalOfficerId: userId })
      .populate("sailors", "-passwordHash");

    if (!division)
      return res.status(404).json({ message: "No division assigned to you" });

    res.json(division.sailors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin / XO view all divisions
export const getAllDivisions = async (req, res) => {
  try {
    const divisions = await Division.find().populate("divisionalOfficerId");
    res.json(divisions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};