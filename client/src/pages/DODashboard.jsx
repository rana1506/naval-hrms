import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import DOSailorCard from "../components/DOSailorCard";

export default function DODashboard() {
  const [sailors, setSailors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/divisions/my-sailors")
      .then(res => setSailors(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <h2>Divisional Officer Dashboard</h2>

      <h3>My Sailors</h3>
      {sailors.length === 0 && <p>No sailors assigned.</p>}

      {sailors.map(s => (
        <DOSailorCard key={s._id} sailor={s} />
      ))}
    </div>
  );
}