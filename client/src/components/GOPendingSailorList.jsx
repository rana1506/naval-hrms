import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function GOPendingSailorList() {
  const [sailors, setSailors] = useState([]);

  useEffect(() => {
    axios.get("/users") // if endpoint exists
      .then((res) => {
        const sailorsOnly = res.data.filter((u) => u.roles.includes("sailor"));
        setSailors(sailorsOnly);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h3>Sailor List</h3>
      {sailors.map((s) => (
        <div key={s._id} className="card">
          <p>
            {s.serviceNo} — {s.fullName}
          </p>
        </div>
      ))}
    </div>
  );
}