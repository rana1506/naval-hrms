import { Link } from "react-router-dom";

export default function DepartmentMenu() {
  return (
    <div className="card">
      <h3>Department Dashboards</h3>

      <Link to="/dashboard/eo">Engineering</Link><br />
      <Link to="/dashboard/lo">Electrical</Link><br />
      <Link to="/dashboard/so">Supply</Link><br />
      <Link to="/dashboard/mo">Medical</Link><br />
      <Link to="/dashboard/xo-dept">Executive</Link>
    </div>
  );
}