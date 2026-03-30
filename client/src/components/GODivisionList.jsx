import { useNavigate } from "react-router-dom";

export default function GODivisionList({ divisions }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Divisions</h3>

      {divisions.map((d) => (
        <div
          key={d._id}
          className="card"
          onClick={() => navigate(`/division/${d._id}`)}
          style={{ cursor: "pointer" }}
        >
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}