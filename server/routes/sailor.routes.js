import express from "express";
import { protect } from "../middleware/auth.js";
import { getSailorById } from "../controllers/sailor.controller.js";

const router = express.Router();

router.get(
  "/:id",
  protect,
  getSailorById
);

export default router;