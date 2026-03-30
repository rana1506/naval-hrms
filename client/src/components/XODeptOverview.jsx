export default function XODeptOverview({ departments, onClickDept }) {
  return (
    <div className="card">
      <h3>Departments Overview</h3>

      {departments.map((d) => (
        <div
          key={d._id}
          className="card"
          onClick={() => onClickDept(d.name)}
          style={{ cursor: "pointer" }}
        >
          <p>{d.name}</p>
        </div>
      ))}
    </div>
  );
}