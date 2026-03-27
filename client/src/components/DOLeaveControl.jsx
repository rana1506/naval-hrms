import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function DOLeaveControl({ sailorId }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    axios.get(`/leave/my`) // placeholder unless specific endpoint exists
      .then(res => setLeaves(res.data))
      .catch(() => {});
  }, []);

  const update = async (leaveId, status) => {
    await axios.patch(`/leave/update/${leaveId}`, { status });
    setLeaves(prev =>
      prev.map(l => (l._id === leaveId ? { ...l, status } : l))
    );
  };

  return (
    <div className="card">
      <h4>Leave Requests</h4>
      {leaves.map(l => (
        <div key={l._id} className="card">
          <p>{l.reason}</p>
          <p>{l.fromDate} - {l.toDate}</p>
          <p>Status: {l.status}</p>
          <button onClick={() => update(l._id, "approved")}>Approve</button>
          <button onClick={() => update(l._id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}