import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  requestLeave,
  viewMyLeave,
  updateLeaveStatus
} from "../controllers/leave.controller.js";

const router = express.Router();

router.post(
  "/request",
  protect,
  checkAccess("profile", "view"),
  requestLeave
);

router.get(
  "/my",
  protect,
  checkAccess("profile", "view"),
  viewMyLeave
);

router.patch(
  "/update/:leaveId",
  protect,
  checkAccess("division", "manage"),
  updateLeaveStatus
);

export default router;