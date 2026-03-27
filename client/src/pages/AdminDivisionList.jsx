import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDivisionList() {
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/divisions").then(res => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Divisions</h3>
      {divisions.map(div => (
        <div key={div._id} className="card">
          <p>{div.name}</p>
        </div>
      ))}
    </div>
  );
}