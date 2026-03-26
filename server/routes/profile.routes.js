import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  myProfile,
  viewSailorProfile,
  editSailorProfile
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", protect, myProfile);

router.get(
  "/view/:sailorId",
  protect,
  checkAccess("sailor", "view"),
  viewSailorProfile
);

router.patch(
  "/edit/:sailorId",
  protect,
  checkAccess("sailor", "edit"),
  editSailorProfile
);

export default router;