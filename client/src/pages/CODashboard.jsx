import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CODashboard() {
  const [overview, setOverview] = useState({
    departments: [],
    divisions: [],
    pending: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      axios.get("/departments"),
      axios.get("/divisions"),
      axios.get("/users/pending")
    ]).then(([dep, div, pen]) => {
      setOverview({
        departments: dep.data,
        divisions: div.data,
        pending: pen.data
      });
    });
  }, []);

  return (
    <div className="card">
      <h2>Commanding Officer Dashboard</h2>

      {/* Pending Users */}
      <h3>Pending Approvals</h3>
      {overview.pending.map(u => (
        <div
          key={u._id}
          className="card"
          onClick={() => navigate(`/profile/view/${u._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{u.fullName} — {u.roles.join(", ")}</p>
        </div>
      ))}

      {/* Departments */}
      <h3>Departments</h3>
      {overview.departments.map(d => (
        <div
          key={d._id}
          className="card"
          onClick={() => navigate(`/department/${d.name}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{d.name}</p>
        </div>
      ))}

      {/* Divisions */}
      <h3>Divisions</h3>
      {overview.divisions.map(d => (
        <div
          key={d._id}
          className="card"
          onClick={() => navigate(`/division/${d._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}