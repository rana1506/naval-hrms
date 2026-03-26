import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  createDivision,
  assignSailorToDivision,
  getDivisionSailors,
  getAllDivisions
} from "../controllers/division.controller.js";

const router = express.Router();

// Admin / CO create division
router.post(
  "/create",
  protect,
  checkAccess("division", "create"),
  createDivision
);

// GO assigns sailors to divisions
router.patch(
  "/assign",
  protect,
  checkAccess("division", "assign"),
  assignSailorToDivision
);

// DO sees his division sailors
router.get(
  "/my-sailors",
  protect,
  checkAccess("division", "manage"),
  getDivisionSailors
);

// XO / CO see all divisions
router.get(
  "/",
  protect,
  checkAccess("division", "view"),
  getAllDivisions
);

export default router;