import Promotion from "../models/Promotion.js";

export const recommendPromotion = async (req, res) => {
  try {
    const { sailorId, remarks } = req.body;

    const record = await Promotion.create({
      sailorId,
      remarks,
      recommendedBy: req.user._id
    });

    res.json({ message: "Promotion recommended", record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPromotionHistory = async (req, res) => {
  try {
    const { sailorId } = req.params;

    const records = await Promotion.find({ sailorId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};