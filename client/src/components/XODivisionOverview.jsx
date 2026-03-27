// src/components/XODivisionOverview.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function XODivisionOverview() {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/divisions").then((res) => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Division Overview</h3>
      {divisions.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}