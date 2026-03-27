import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function SailorLeave() {
  const [leaveList, setLeaveList] = useState([]);
  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: ""
  });

  useEffect(() => {
    axios.get("/leave/my").then(res => setLeaveList(res.data));
  }, []);

  const requestLeave = async () => {
    await axios.post("/leave/request", form);
    setLeaveList(prev => [...prev, form]);
    setForm({ fromDate: "", toDate: "", reason: "" });
  };

  return (
    <div className="card">
      <h3>Leave</h3>

      {leaveList.map((l, idx) => (
        <div key={idx} className="card">
          <p>{l.fromDate} → {l.toDate}</p>
          <p>{l.reason}</p>
          <p>Status: {l.status}</p>
        </div>
      ))}

      <h4>Request Leave</h4>
      <input
        type="date"
        value={form.fromDate}
        onChange={e => setForm({ ...form, fromDate: e.target.value })}
      />
      <input
        type="date"
        value={form.toDate}
        onChange={e => setForm({ ...form, toDate: e.target.value })}
      />
      <input
        placeholder="Reason"
        value={form.reason}
        onChange={e => setForm({ ...form, reason: e.target.value })}
      />
      <button onClick={requestLeave}>Submit</button>
    </div>
  );
}