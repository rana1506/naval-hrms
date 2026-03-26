import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/tokens.js";
import { ROLES } from "../config/roles.js";

// Officer signup (pending approval by XO)
export const signupOfficer = async (req, res) => {
  try {
    const { serviceNo, rank, fullName, password } = req.body;

    const exists = await User.findOne({ serviceNo });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await hashPassword(password);

    const officer = await User.create({
      serviceNo,
      rank,
      fullName,
      passwordHash,
      roles: [ROLES.OFFICER],
      status: "pending"
    });

    res.json({ message: "Officer registered. Await XO approval.", officer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Sailor signup (pending approval by RO)
export const signupSailor = async (req, res) => {
  try {
    const { serviceNo, rank, fullName, password } = req.body;

    const exists = await User.findOne({ serviceNo });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await hashPassword(password);

    const sailor = await User.create({
      serviceNo,
      rank,
      fullName,
      passwordHash,
      roles: [ROLES.SAILOR],
      status: "pending"
    });

    res.json({ message: "Sailor registered. Await RO approval.", sailor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { serviceNo, password } = req.body;

    const user = await User.findOne({ serviceNo });
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    if (user.status !== "approved")
      return res
        .status(401)
        .json({ message: "Account not approved yet." });

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};