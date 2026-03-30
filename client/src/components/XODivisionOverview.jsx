export default function XODivisionOverview({ divisions, onClickDiv }) {
  return (
    <div className="card">
      <h3>Divisions Overview</h3>

      {divisions.map((div) => (
        <div
          key={div._id}
          className="card"
          onClick={() => onClickDiv(div._id)}
          style={{ cursor: "pointer" }}
        >
          <p>{div.name}</p>
        </div>
      ))}
    </div>
  );
}