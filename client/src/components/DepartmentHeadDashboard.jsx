import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function DepartmentHeadDashboard({ departmentName }) {
  const [sailors, setSailors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/departments/${departmentName}/sailors`)
      .then((res) => setSailors(res.data))
      .catch(() => {});
  }, [departmentName]);

  return (
    <div className="card">
      <h2>{departmentName} Department</h2>

      {sailors.length === 0 && <p>No sailors in this department.</p>}

      {sailors.map((s) => (
        <div
          key={s._id}
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/profile/view/${s._id}`)}
        >
          <p>{s.fullName} — {s.rank}</p>
        </div>
      ))}
    </div>
  );
}