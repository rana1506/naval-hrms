// src/pages/XODashboard.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function XODashboard() {
  const [pendingOfficers, setPendingOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const officers = res.data.filter((u) => u.roles.includes("officer"));
      setPendingOfficers(officers);
    });

    axios.get("/departments").then((res) => setDepartments(res.data));
    axios.get("/divisions").then((res) => setDivisions(res.data));
  }, []);

  const approveOfficer = async (id) => {
    const roles = prompt("Assign officer roles (comma-separated):");
    if (!roles) return;

    await axios.patch(`/users/approve/officer/${id}`, {
      roles: roles.split(",").map((r) => r.trim()),
    });

    setPendingOfficers((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div className="card">
      <h2>Executive Officer (XO) Dashboard</h2>

      <h3>Pending Officer Approvals</h3>
      {pendingOfficers.map((o) => (
        <div key={o._id} className="card">
          <p>
            {o.fullName} — {o.rank}
          </p>
          <button onClick={() => approveOfficer(o._id)}>Approve Officer</button>
        </div>
      ))}

      <h3>All Departments</h3>
      {departments.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}

      <h3>All Divisions</h3>
      {divisions.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}