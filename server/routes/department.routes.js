import express from "express";
import { protect } from "../middleware/auth.js";
import { checkAccess } from "../middleware/checkAccess.js";

import {
  createDepartment,
  getAllDepartments,
  getDepartmentSailors
} from "../controllers/department.controller.js";

const router = express.Router();

// Admin / CO create department
router.post(
  "/create",
  protect,
  checkAccess("department", "create"),
  createDepartment
);

// XO / CO / Admin view all departments
router.get(
  "/",
  protect,
  checkAccess("department", "view"),
  getAllDepartments
);

// Department head dashboard: view sailors
router.get(
  "/:deptName/sailors",
  protect,
  checkAccess("department", "view"),
  getDepartmentSailors
);

export default router;