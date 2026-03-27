import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function DOPromotionControl({ sailorId }) {
  const [history, setHistory] = useState([]);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    axios.get(`/promotion/history/${sailorId}`)
      .then(res => setHistory(res.data))
      .catch(() => {});
  }, [sailorId]);

  const recommend = async () => {
    await axios.post("/promotion/recommend", {
      sailorId,
      remarks
    });

    setHistory(prev => [...prev, { remarks }]);
    setRemarks("");
  };

  return (
    <div className="card">
      <h4>Promotion Recommendations</h4>

      {history.map((h, idx) => (
        <div key={idx} className="card">
          <p>{h.remarks}</p>
        </div>
      ))}

      <h4>Recommend Promotion</h4>
      <input
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <button onClick={recommend}>Submit</button>
    </div>
  );
}