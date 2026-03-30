import { useState } from "react";

export default function ROAssignDepartment({ sailor, departments, onAssign }) {
  const [selectedDept, setSelectedDept] = useState("");

  return (
    <div className="card">
      <h4>Assign Department to {sailor.fullName}</h4>

      <select
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        <option value="">Select Department</option>
        {departments.map((d) => (
          <option key={d._id} value={d.name}>
            {d.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          if (selectedDept) onAssign(sailor._id, selectedDept);
        }}
      >
        Approve & Assign
      </button>
    </div>
  );
}