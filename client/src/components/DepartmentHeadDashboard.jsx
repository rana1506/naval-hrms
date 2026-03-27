import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function DepartmentHeadDashboard({ departmentName }) {
  const [sailors, setSailors] = useState([]);

  useEffect(() => {
    axios
      .get(`/departments/${departmentName}/sailors`)
      .then((res) => setSailors(res.data))
      .catch(() => {});
  }, [departmentName]);

  return (
    <div className="card">
      <h2>{departmentName} Department Dashboard</h2>

      <h3>Sailors in Dept</h3>
      {sailors.map((s) => (
        <div key={s._id} className="card">
          <p>
            {s.fullName} — {s.rank}
          </p>
        </div>
      ))}
    </div>
  );
}