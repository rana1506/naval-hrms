import { useState } from "react";
import axios from "../api/axios";

export default function ROAssignDepartment({ sailorId, onAssigned }) {
  const [department, setDepartment] = useState("");

  const assign = async () => {
    if (!department) return;
    await axios.patch(`/users/approve/sailor/${sailorId}`, {
      department,
    });
    if (onAssigned) onAssigned(sailorId);
  };

  return (
    <div className="card">
      <h4>Assign Department</h4>
      <input
        placeholder="Department Name"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button onClick={assign}>Assign</button>
    </div>
  );
}