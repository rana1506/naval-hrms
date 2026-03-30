import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function SailorWelfare({ sailorId }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get(`/welfare/${sailorId}`)
      .then(res => setCases(res.data))
      .catch(() => {});
  }, [sailorId]);

  return (
    <div className="card">
      <h3>Welfare Cases</h3>

      {cases.map((c, idx) => (
        <div key={idx} className="card">
          <p><strong>Issue:</strong> {c.issue}</p>
          <p><strong>Remarks:</strong> {c.remarks}</p>
        </div>
      ))}
    </div>
  );
}