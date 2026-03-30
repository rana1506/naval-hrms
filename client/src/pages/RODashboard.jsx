import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import ROPendingSailorList from "../components/ROPendingSailorList";
import ROAssignDepartment from "../components/ROAssignDepartment";

export default function RODashboard() {
  const [pendingSailors, setPendingSailors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const sailors = res.data.filter((u) => u.roles.includes("sailor"));
      setPendingSailors(sailors);
    });

    axios.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  const assignDept = async (sailorId, departmentName) => {
    await axios.patch(`/users/approve/sailor/${sailorId}`, {
      department: departmentName,
    });

    setPendingSailors((prev) => prev.filter((s) => s._id !== sailorId));
  };

  return (
    <div className="card">
      <h2>Regulating Officer (RO) Dashboard</h2>

      <ROPendingSailorList
        sailors={pendingSailors}
        onClickSailor={(id) => navigate(`/profile/view/${id}`)}
      />

      <h3>Assign Department</h3>
      {pendingSailors.map((s) => (
        <ROAssignDepartment
          key={s._id}
          sailor={s}
          departments={departments}
          onAssign={assignDept}
        />
      ))}

      <h3>Departments</h3>
      {departments.map((d) => (
        <div
          key={d._id}
          className="card"
          onClick={() => navigate(`/department/${d.name}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}