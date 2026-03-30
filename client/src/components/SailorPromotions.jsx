import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function SailorPromotions({ sailorId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(`/promotion/history/${sailorId}`)
      .then(res => setHistory(res.data))
      .catch(() => {});
  }, [sailorId]);

  return (
    <div className="card">
      <h3>Promotion History</h3>

      {history.length === 0 && <p>No recommendations yet.</p>}

      {history.map((h, idx) => (
        <div key={idx} className="card">
          <p>{h.remarks}</p>
        </div>
      ))}
    </div>
  );
}