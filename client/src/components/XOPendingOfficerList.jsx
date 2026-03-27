// src/components/XOPendingOfficerList.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function XOPendingOfficerList() {
  const [pendingOfficers, setPendingOfficers] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const officers = res.data.filter((u) => u.roles.includes("officer"));
      setPendingOfficers(officers);
    });
  }, []);

  return (
    <div className="card">
      <h3>Pending Officers</h3>
      {pendingOfficers.map((o) => (
        <div key={o._id} className="card">
          <p>{o.fullName}</p>
        </div>
      ))}
    </div>
  );
}