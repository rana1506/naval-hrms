/**
 * Naval HRMS Single-File Seeder
 * Run with:
 *   node seed.js
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { ROLES } from "./config/roles.js";
import { hashPassword } from "./utils/hash.js";

import Department from "./models/Department.js";
import Division from "./models/Division.js";
import User from "./models/User.js";

const run = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing old collections...");
    await Promise.all([
      Department.deleteMany(),
      Division.deleteMany(),
      User.deleteMany()
    ]);

    console.log("Seeding departments...");
    const deptNames = [
      "Engineering",
      "Electrical",
      "Supply",
      "Medical",
      "Executive"
    ];
    const departments = await Department.insertMany(
      deptNames.map((d) => ({ name: d }))
    );

    console.log("Seeding divisions...");
    const divisionNames = ["Alpha Division", "Bravo Division", "Charlie Division"];
    const divisions = await Division.insertMany(
      divisionNames.map((d) => ({ name: d }))
    );

    console.log("Seeding users...");
    const pwd = await hashPassword("Password123");

    const users = [
      {
        serviceNo: "CO001",
        rank: "Captain",
        fullName: "Commanding Officer",
        passwordHash: pwd,
        roles: [ROLES.CO],
        status: "approved"
      },
      {
        serviceNo: "ADM001",
        rank: "Commander",
        fullName: "System Admin",
        passwordHash: pwd,
        roles: [ROLES.ADMIN],
        status: "approved"
      },
      {
        serviceNo: "XO001",
        rank: "Commander",
        fullName: "Executive Officer",
        passwordHash: pwd,
        roles: [ROLES.XO],
        status: "approved"
      },
      {
        serviceNo: "RO001",
        rank: "Lieutenant",
        fullName: "Regulating Officer",
        passwordHash: pwd,
        roles: [ROLES.RO],
        status: "approved"
      },
      {
        serviceNo: "GO001",
        rank: "Lieutenant",
        fullName: "Gunnery Officer",
        passwordHash: pwd,
        roles: [ROLES.GO],
        status: "approved"
      },
      {
        serviceNo: "EO001",
        rank: "Lieutenant Commander",
        fullName: "Engineering Officer",
        passwordHash: pwd,
        roles: [ROLES.EO],
        status: "approved",
        department: "Engineering"
      },
      {
        serviceNo: "LO001",
        rank: "Lieutenant Commander",
        fullName: "Electrical Officer",
        passwordHash: pwd,
        roles: [ROLES.LO],
        status: "approved",
        department: "Electrical"
      },
      {
        serviceNo: "SO001",
        rank: "Lieutenant Commander",
        fullName: "Supply Officer",
        passwordHash: pwd,
        roles: [ROLES.SO],
        status: "approved",
        department: "Supply"
      },
      {
        serviceNo: "MO001",
        rank: "Lieutenant Commander",
        fullName: "Medical Officer",
        passwordHash: pwd,
        roles: [ROLES.MO],
        status: "approved",
        department: "Medical"
      },

      // Sample Sailors
      {
        serviceNo: "S001",
        rank: "Leading Seaman",
        fullName: "John Sailor",
        passwordHash: pwd,
        roles: [ROLES.SAILOR],
        status: "approved",
        department: "Engineering"
      },
      {
        serviceNo: "S002",
        rank: "Able Seaman",
        fullName: "David Boatswain",
        passwordHash: pwd,
        roles: [ROLES.SAILOR],
        status: "approved",
        department: "Executive"
      }
    ];

    await User.insertMany(users);

    console.log("All seed data inserted successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

run();