import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        {user && <button onClick={logout}>Logout</button>}
      </nav>

      <div className="container">{children}</div>
    </>
  );
}