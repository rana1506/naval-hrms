import { useNavigate } from "react-router-dom";

export default function ROPendingSailorList({ sailors, onClickSailor }) {
  return (
    <div className="card">
      <h3>Pending Sailor Approvals</h3>

      {sailors.length === 0 && <p>No pending sailors.</p>}

      {sailors.map((s) => (
        <div
          key={s._id}
          className="card"
          onClick={() => onClickSailor(s._id)}
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