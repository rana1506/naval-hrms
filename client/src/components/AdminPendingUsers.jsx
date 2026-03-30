import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminPendingUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/users/pending").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="card">
      <h3>Pending Users</h3>
      {users.map(u => (
        <div
          key={u._id}
          className="card"
          onClick={() => navigate(`/profile/view/${u._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{u.serviceNo} — {u.fullName} ({u.roles.join(", ")})</p>
        </div>
      ))}
    </div>
  );
}