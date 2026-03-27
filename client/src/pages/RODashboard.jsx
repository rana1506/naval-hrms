import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function RODashboard() {
  const [pendingSailors, setPendingSailors] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const sailors = res.data.filter((u) => u.roles.includes("sailor"));
      setPendingSailors(sailors);
    });

    axios.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  const approveSailor = async (id) => {
    const dept = prompt("Assign department:");
    if (!dept) return;

    await axios.patch(`/users/approve/sailor/${id}`, { department: dept });

    setPendingSailors((prev) => prev.filter((s) => s._id !== id));
  };

  return (
    <div className="card">
      <h2>Regulating Officer (RO) Dashboard</h2>

      <h3>Pending Sailor Approvals</h3>
      {pendingSailors.map((s) => (
        <div key={s._id} className="card">
          <p>
            {s.fullName} — {s.rank}
          </p>
          <button onClick={() => approveSailor(s._id)}>
            Approve & Assign Dept
          </button>
        </div>
      ))}

      <h3>Departments</h3>
      {departments.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}