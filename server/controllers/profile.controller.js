import User from "../models/User.js";

// "My Profile" endpoint (all users)
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DO: View any sailor in division
export const viewSailorProfile = async (req, res) => {
  try {
    const { sailorId } = req.params;

    const sailor = await User.findById(sailorId).select("-passwordHash");
    if (!sailor) return res.status(404).json({ message: "Sailor not found" });

    res.json(sailor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DO: Edit sailor profile
export const editSailorProfile = async (req, res) => {
  try {
    const { sailorId } = req.params;

    const allowedFields = ["rank", "fullName", "department"];
    const updates = {};

    for (let key of allowedFields) {
      if (req.body[key]) updates[key] = req.body[key];
    }

    const sailor = await User.findByIdAndUpdate(
      sailorId,
      { $set: updates },
      { new: true }
    ).select("-passwordHash");

    res.json({ message: "Profile updated", sailor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};