export default function XOPendingOfficerList({ officers, onClickOfficer }) {
  return (
    <div className="card">
      <h3>Pending Officer Approvals</h3>

      {officers.length === 0 && <p>No pending officers.</p>}

      {officers.map((o) => (
        <div
          key={o._id}
          className="card"
          onClick={() => onClickOfficer(o._id)}
          style={{ cursor: "pointer" }}
        >
          <p>{o.fullName} — {o.rank}</p>
        </div>
      ))}
    </div>
  );
}