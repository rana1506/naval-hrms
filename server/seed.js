/**
 * Naval HRMS Seeder with:
 * - Departments
 * - Divisions auto-linked to DOs
 * - Officers + Department Heads
 * - Random Sailors
 * - Auto-distribute sailors into divisions
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

const RANDOM_SAILOR_COUNT = 50;   // <--- adjust this as needed

// Random name parts for sailor generator
const FIRST_NAMES = ["John", "David", "Mark", "Paul", "James", "Robert", "Daniel", "Joseph", "Alex"];
const LAST_NAMES = ["Nelson", "Boatman", "Carter", "Hughes", "Jackson", "Brooks", "Foster", "Bennett", "Gray"];
const RANKS = ["Able Seaman", "Leading Seaman", "Ordinary Seaman"];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomSailors = async (count, pwd) => {
  const sailors = [];

  for (let i = 1; i <= count; i++) {
    const fullName = `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
    sailors.push({
      serviceNo: `RS${String(i).padStart(3, "0")}`,
      rank: randomItem(RANKS),
      fullName,
      passwordHash: pwd,
      roles: [ROLES.SAILOR],
      status: "approved",
      department: null,     // assigned later or by RO
      division: null        // assigned later
    });
  }

  return sailors;
};

const run = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing old collections...");
    await Department.deleteMany();
    await Division.deleteMany();
    await User.deleteMany();

    console.log("Seeding departments...");
    const deptNames = ["Engineering", "Electrical", "Supply", "Medical", "Executive"];
    await Department.insertMany(deptNames.map((d) => ({ name: d })));

    console.log("Seeding divisions...");
    const divisionNames = ["Alpha Division", "Bravo Division", "Charlie Division"];
    let divisions = await Division.insertMany(
      divisionNames.map((d) => ({ name: d }))
    );

    console.log("Seeding users...");
    const pwd = await hashPassword("Password123");

    const baseUsers = [
      // HQ Staff
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

      // Core Officers
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

      // Department Heads
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

      // Divisional Officers (DOs)
      {
        serviceNo: "DO001",
        rank: "Sub Lieutenant",
        fullName: "Divisional Officer 1",
        passwordHash: pwd,
        roles: [ROLES.DO],
        status: "approved"
      },
      {
        serviceNo: "DO002",
        rank: "Sub Lieutenant",
        fullName: "Divisional Officer 2",
        passwordHash: pwd,
        roles: [ROLES.DO],
        status: "approved"
      },
      {
        serviceNo: "DO003",
        rank: "Sub Lieutenant",
        fullName: "Divisional Officer 3",
        passwordHash: pwd,
        roles: [ROLES.DO],
        status: "approved"
      }
    ];

    // Insert officers
    const officerDocs = await User.insertMany(baseUsers);

    console.log(`Generating ${RANDOM_SAILOR_COUNT} random sailors...`);
    const randomSailors = await generateRandomSailors(RANDOM_SAILOR_COUNT, pwd);

    // Insert random sailors
    const sailorDocs = await User.insertMany(randomSailors);

    console.log("Auto-linking DOs to divisions...");

    const doUsers = officerDocs.filter((u) => u.roles.includes(ROLES.DO));
    if (doUsers.length === 0) throw new Error("No DOs found!");

    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      const doOfficer = doUsers[i % doUsers.length]; // round-robin assignment

      division.divisionalOfficerId = doOfficer._id;
      await division.save();
    }

    console.log("Distributing sailors into divisions...");

    let updatedDivisions = await Division.find();
    let updatedSailors = await User.find({ roles: ROLES.SAILOR });

    for (let i = 0; i < updatedSailors.length; i++) {
      const sailor = updatedSailors[i];
      const division = updatedDivisions[i % updatedDivisions.length];

      sailor.division = division._id;
      await sailor.save();

      division.sailors.push(sailor._id);
      await division.save();
    }

    console.log("Random sailors distributed evenly across divisions.");
    console.log("Seed complete.");
    process.exit(0);

  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

run();