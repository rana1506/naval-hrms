import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);

  const hasRole = (role) => user?.roles?.includes(role);

  return (
    <>
      <nav>
        {hasRole("admin") && <Link to="/dashboard/admin">Admin</Link>}
        {hasRole("co") && <Link to="/dashboard/co">CO</Link>}
        {hasRole("xo") && <Link to="/dashboard/xo">XO</Link>}
        {hasRole("ro") && <Link to="/dashboard/ro">RO</Link>}
        {hasRole("go") && <Link to="/dashboard/go">GO</Link>}
        {hasRole("do") && <Link to="/dashboard/do">DO</Link>}
        {hasRole("eo") && <Link to="/dashboard/eo">EO</Link>}
        {hasRole("lo") && <Link to="/dashboard/lo">LO</Link>}
        {hasRole("so") && <Link to="/dashboard/so">SO</Link>}
        {hasRole("mo") && <Link to="/dashboard/mo">MO</Link>}
        {hasRole("xo") && <Link to="/dashboard/xo-dept">Executive Dept</Link>}
        {hasRole("sailor") && <Link to="/dashboard/sailor">My Dashboard</Link>}

        {user && (
          <button
            onClick={logout}
            style={{ marginLeft: "20px", padding: "6px 12px" }}
          >
            Logout
          </button>
        )}
      </nav>

      <div className="container">{children}</div>
    </>
  );
}