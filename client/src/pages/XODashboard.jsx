import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import XOPendingOfficerList from "../components/XOPendingOfficerList";
import XODeptOverview from "../components/XODeptOverview";
import XODivisionOverview from "../components/XODivisionOverview";

export default function XODashboard() {
  const navigate = useNavigate();
  const [pendingOfficers, setPendingOfficers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/users/pending").then((res) => {
      const officers = res.data.filter((u) => u.roles.includes("officer"));
      setPendingOfficers(officers);
    });

    axios.get("/departments").then((res) => setDepartments(res.data));
    axios.get("/divisions").then((res) => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Executive Officer (XO) Dashboard</h2>

      <XOPendingOfficerList 
        officers={pendingOfficers} 
        onClickOfficer={(id) => navigate(`/profile/view/${id}`)} 
      />

      <XODeptOverview
        departments={departments}
        onClickDept={(name) => navigate(`/department/${name}`)}
      />

      <XODivisionOverview
        divisions={divisions}
        onClickDiv={(id) => navigate(`/division/${id}`)}
      />
    </div>
  );
}