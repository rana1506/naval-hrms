import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function DivisionView() {
  const { divisionId } = useParams();
  const navigate = useNavigate();
  const [division, setDivision] = useState(null);

  useEffect(() => {
    axios
      .get(`/divisions/${divisionId}`)
      .then((res) => setDivision(res.data))
      .catch(() => {});
  }, [divisionId]);

  if (!division) {
    return <div className="card">Loading division...</div>;
  }

  return (
    <div className="card">
      <h2>{division.name}</h2>

      <h3>Sailors in this Division:</h3>

      {division.sailors?.length === 0 && <p>No sailors assigned yet.</p>}

      {division.sailors?.map((s) => (
        <div
          key={s._id}
          className="card"
          onClick={() => navigate(`/profile/view/${s._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>
            {s.fullName} — {s.rank}
          </p>
        </div>
      ))}
    </div>
  );
}