import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";
import {
  approveOfficer,
  approveSailor,
  getAllPending,
  getAllUsers 
} from "../controllers/user.controller.js";

const router = express.Router();

// Admin can view all users
router.get("/", protect, checkAccess("user", "view-all"), getAllUsers);

// XO approves officers
router.patch(
  "/approve/officer/:id",
  protect,
  checkAccess("user", "approve-officer"),
  approveOfficer
);

// RO approves sailors
router.patch(
  "/approve/sailor/:id",
  protect,
  checkAccess("user", "approve-sailor"),
  approveSailor
);

// XO can view all pending
router.get(
  "/pending",
  protect,
  checkAccess("user", "view-all"),
  getAllPending
);

export default router;