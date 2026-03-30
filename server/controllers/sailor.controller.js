import User from "../models/User.js";

export const getSailorById = async (req, res) => {
  try {
    const sailor = await User.findById(req.params.id)
      .select("-passwordHash")
      .populate("division");

    if (!sailor) {
      return res.status(404).json({ message: "Sailor not found" });
    }

    res.json(sailor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};