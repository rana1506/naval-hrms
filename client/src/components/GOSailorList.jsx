import { useNavigate } from "react-router-dom";

export default function GOSailorList({ sailors }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>All Sailors</h3>

      {sailors.map((s) => (
        <div
          key={s._id}
          className="card"
          onClick={() => navigate(`/profile/view/${s._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{s.fullName} — {s.rank}</p>
        </div>
      ))}
    </div>
  );
}