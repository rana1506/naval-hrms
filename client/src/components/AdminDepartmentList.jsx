import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDepartmentList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/departments").then(res => setDepartments(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Departments</h3>
      {departments.map(dep => (
        <div
          key={dep._id}
          className="card"
          onClick={() => navigate(`/department/${dep.name}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{dep.name}</p>
        </div>
      ))}
    </div>
  );
}