// src/components/XODepartmentOverview.jsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function XODepartmentOverview() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Department Overview</h3>
      {departments.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}