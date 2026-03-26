import express from "express";
import {
  signupOfficer,
  signupSailor,
  login
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup/officer", signupOfficer);
router.post("/signup/sailor", signupSailor);
router.post("/login", login);

export default router;