import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import GOAssignDivision from "../components/GOAssignDivision";

export default function GODashboard() {
  const [sailors, setSailors] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users")  // requires a users listing endpoint
      .then(res => {
        const sailorsOnly = res.data.filter(u => u.roles.includes("sailor"));
        setSailors(sailorsOnly);
      })
      .catch(() => {});

    axios.get("/divisions").then(res => setDivisions(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Gunnery Officer (GO) Dashboard</h2>

      <h3>Assign Sailors to Divisions</h3>
      {sailors.map((sailor) => (
        <div key={sailor._id} className="card">
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/profile/view/${sailor._id}`)}
          >
            {sailor.fullName} — {sailor.rank}
          </p>

          <GOAssignDivision 
            sailorId={sailor._id} 
            divisions={divisions} 
          />
        </div>
      ))}

      <h3>Divisions</h3>
      {divisions.map(div => (
        <div
          key={div._id}
          className="card"
          onClick={() => navigate(`/division/${div._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{div.name}</p>
        </div>
      ))}
    </div>
  );
}