import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ROPendingSailorList() {
  const [pendingSailors, setPendingSailors] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const sailors = res.data.filter((u) => u.roles.includes("sailor"));
      setPendingSailors(sailors);
    });
  }, []);

  return (
    <div className="card">
      <h3>Pending Sailor Accounts</h3>
      {pendingSailors.map((s) => (
        <div key={s._id} className="card">
          <p>
            {s.serviceNo} — {s.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}