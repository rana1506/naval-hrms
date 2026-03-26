import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  addWelfareCase,
  getWelfareCases
} from "../controllers/welfare.controller.js";

const router = express.Router();

router.post(
  "/add",
  protect,
  checkAccess("division", "manage"),
  addWelfareCase
);

router.get(
  "/:sailorId",
  protect,
  checkAccess("sailor", "view"),
  getWelfareCases
);

export default router;