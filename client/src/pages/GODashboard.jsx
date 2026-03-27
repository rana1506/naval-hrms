import { useEffect, useState } from "react";
import axios from "../api/axios";
import GOAssignDivision from "../components/GOAssignDivision";

export default function GODashboard() {
  const [sailors, setSailors] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    axios.get("/divisions").then((res) => setDivisions(res.data));
    axios.get("/users/pending").then(() => {}); // placeholder

    axios.get("/users") // if you create /users listing
      .then((res) => {
        const sailorsOnly = res.data.filter((u) => u.roles.includes("sailor"));
        setSailors(sailorsOnly);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h2>Gunnery Officer (GO) Dashboard</h2>

      <h3>Assign Sailors to Divisions</h3>
      {sailors.map((sailor) => (
        <div key={sailor._id} className="card">
          <p>
            {sailor.fullName} — {sailor.rank}
          </p>
          <GOAssignDivision sailorId={sailor._id} divisions={divisions} />
        </div>
      ))}

      <h3>Divisions Overview</h3>
      {divisions.map((d) => (
        <div key={d._id} className="card">
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}