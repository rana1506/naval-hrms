import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function SailorPromotions() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/promotion/me") // If needed, backend must expose this
      .then(res => setHistory(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h3>Promotion History</h3>

      {history.map((h, idx) => (
        <div key={idx} className="card">
          <p>{h.remarks}</p>
        </div>
      ))}
    </div>
  );
}