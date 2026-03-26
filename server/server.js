import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { RBAC } from "./config/rbac.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import deptRoutes from "./routes/department.routes.js";
import divisionRoutes from "./routes/division.routes.js";


// Load environment
dotenv.config();

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Attach RBAC
app.locals.rbac = RBAC;

// Connect DB
connectDB();

// Routes (added in later modules)
app.get("/", (req, res) => res.send("Naval HRMS API running"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);


app.use("/departments", deptRoutes);
app.use("/divisions", divisionRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));