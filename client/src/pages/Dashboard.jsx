import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.fullName} ({user?.rank})</p>
      <p>Roles: {user?.roles?.join(", ")}</p>
    </div>
  );
}