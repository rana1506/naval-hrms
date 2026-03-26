import Welfare from "../models/Welfare.js";

export const addWelfareCase = async (req, res) => {
  try {
    const { sailorId, issue, remarks } = req.body;

    const welfare = await Welfare.create({
      sailorId,
      issue,
      remarks,
      createdBy: req.user._id
    });

    res.json({ message: "Welfare case added", welfare });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWelfareCases = async (req, res) => {
  try {
    const { sailorId } = req.params;

    const cases = await Welfare.find({ sailorId });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};