import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then(res => setUsers(res.data));
    axios.get("/departments").then(res => setDepartments(res.data));
    axios.get("/divisions").then(res => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Admin Dashboard</h2>

      <h3>Pending Approvals</h3>
      {users.map(u => (
        <div key={u._id} className="card">
          <p>{u.fullName} - {u.roles.join(", ")}</p>
        </div>
      ))}

      <h3>Departments</h3>
      {departments.map(d => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}

      <h3>Divisions</h3>
      {divisions.map(d => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}