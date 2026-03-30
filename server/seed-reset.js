/**
 * Naval HRMS Reset Seeder
 * This script CLEARS all HRMS data but does NOT insert anything.
 * 
 * Run with:
 *    node reset-seed.js
 */

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";

import Department from "./models/Department.js";
import Division from "./models/Division.js";
import User from "./models/User.js";
import Leave from "./models/Leave.js";
import Welfare from "./models/Welfare.js";
import Promotion from "./models/Promotion.js";

const run = async () => {
  try {
    console.log("🔗 Connecting to database...");
    await connectDB();

    console.log("🧨 Clearing Users...");
    await User.deleteMany();

    console.log("🧨 Clearing Departments...");
    await Department.deleteMany();

    console.log("🧨 Clearing Divisions...");
    await Division.deleteMany();

    console.log("🧨 Clearing Leave Records...");
    await Leave.deleteMany();

    console.log("🧨 Clearing Welfare Cases...");
    await Welfare.deleteMany();

    console.log("🧨 Clearing Promotion Records...");
    await Promotion.deleteMany();

    console.log("✅ Database reset complete. All collections are empty.");
    process.exit(0);

  } catch (err) {
    console.error("❌ Reset error:", err);
    process.exit(1);
  }
};

run();