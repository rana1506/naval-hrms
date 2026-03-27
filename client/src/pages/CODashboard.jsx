import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function CODashboard() {
  const [overview, setOverview] = useState({
    departments: [],
    divisions: [],
    users: []
  });

  useEffect(() => {
    Promise.all([
      axios.get("/departments"),
      axios.get("/divisions"),
      axios.get("/users/pending")
    ]).then(([dep, div, usr]) => {
      setOverview({
        departments: dep.data,
        divisions: div.data,
        users: usr.data
      });
    });
  }, []);

  return (
    <div className="card">
      <h2>Commanding Officer Dashboard</h2>

      <h3>Pending Approvals</h3>
      {overview.users.map(u => (
        <div key={u._id} className="card">
          <p>{u.fullName} - {u.roles.join(", ")}</p>
        </div>
      ))}

      <h3>Departments</h3>
      {overview.departments.map(d => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}

      <h3>Divisions</h3>
      {overview.divisions.map(d => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}