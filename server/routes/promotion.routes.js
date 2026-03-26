import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  recommendPromotion,
  getPromotionHistory
} from "../controllers/promotion.controller.js";

const router = express.Router();

router.post(
  "/recommend",
  protect,
  checkAccess("division", "manage"),
  recommendPromotion
);

router.get(
  "/history/:sailorId",
  protect,
  checkAccess("sailor", "view"),
  getPromotionHistory
);

export default router;