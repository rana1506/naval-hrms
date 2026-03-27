import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function DOWelfareControl({ sailorId }) {
  const [cases, setCases] = useState([]);
  const [issue, setIssue] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    axios.get(`/welfare/${sailorId}`)
      .then(res => setCases(res.data))
      .catch(() => {});
  }, [sailorId]);

  const addCase = async () => {
    await axios.post("/welfare/add", {
      sailorId,
      issue,
      remarks
    });

    setCases(prev => [...prev, { issue, remarks }]);
    setIssue("");
    setRemarks("");
  };

  return (
    <div className="card">
      <h4>Welfare Cases</h4>

      {cases.map((c, idx) => (
        <div key={idx} className="card">
          <p>{c.issue}</p>
          <p>{c.remarks}</p>
        </div>
      ))}

      <h4>Add New Case</h4>
      <input
        placeholder="Issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <input
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <button onClick={addCase}>Add</button>
    </div>
  );
}