import { useState } from "react";
import axios from "../api/axios";

export default function GOAssignDivision({ sailorId, divisions }) {
  const [divisionId, setDivisionId] = useState("");

  const assign = async () => {
    if (!divisionId) return;

    await axios.patch("/divisions/assign", {
      sailorId,
      divisionId,
    });

    alert("Sailor assigned");
  };

  return (
    <div>
      <select
        value={divisionId}
        onChange={(e) => setDivisionId(e.target.value)}
      >
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </select>
      <button onClick={assign}>Assign to Division</button>
    </div>
  );
}