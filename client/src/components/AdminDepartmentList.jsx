import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("/departments").then(res => setDepartments(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Departments</h3>
      {departments.map(dep => (
        <div key={dep._id} className="card">
          <p>{dep.name}</p>
        </div>
      ))}
    </div>
  );
}