import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function DOLeaveControl({ sailorId }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
      axios.get(`/leave/sailor/${sailorId}`) // axios.get(`/leave/my`) is replace by /leave/sailor/:id if needed
      .then(res => setLeaves(res.data))
      .catch(() => {});
  }, []);

  const updateStatus = async (leaveId, status) => {
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
          <p>{l.fromDate} → {l.toDate}</p>
          <p>Status: {l.status}</p>

          <button onClick={() => updateStatus(l._id, "approved")}>
            Approve
          </button>
          <button onClick={() => updateStatus(l._id, "rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}