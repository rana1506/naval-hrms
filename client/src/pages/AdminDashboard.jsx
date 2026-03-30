import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/pending").then(res => setPending(res.data));
    axios.get("/departments").then(res => setDepartments(res.data));
    axios.get("/divisions").then(res => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>

      {/* Pending Approvals */}
      <h3>Pending Approvals</h3>
      {pending.map(u => (
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
      {departments.map(d => (
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
      {divisions.map(div => (
        <div 
          key={div._id}
          className="card"
          onClick={() => navigate(`/division/${div._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{div.name}</p>
        </div>
      ))}
    </div>
  );
}
