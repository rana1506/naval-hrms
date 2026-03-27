import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function SailorWelfare() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get("/welfare/me") // If needed, backend adjustment required
      .then(res => setCases(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h3>Welfare Cases</h3>

      {cases.map((c, idx) => (
        <div key={idx} className="card">
          <p>{c.issue}</p>
          <p>{c.remarks}</p>
        </div>
      ))}
    </div>
  );
}