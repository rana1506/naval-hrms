import Leave from "../models/Leave.js";

// Sailor requests leave
export const requestLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      sailorId: req.user._id,
      ...req.body
    });
    res.json({ message: "Leave requested", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Sailor views own leave
export const viewMyLeave = async (req, res) => {
  try {
    const leaves = await Leave.find({ sailorId: req.user._id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DO approves/rejects leave
export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body; // approved/rejected

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    res.json({ message: "Leave updated", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};