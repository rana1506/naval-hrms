import { useNavigate } from "react-router-dom";

export default function SailorProfile({ profile }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>My Profile</h3>
      <p><strong>Name:</strong> {profile.fullName}</p>
      <p><strong>Rank:</strong> {profile.rank}</p>
      <p><strong>Service No:</strong> {profile.serviceNo}</p>

      <p 
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate(`/department/${profile.department}`)}
      >
        <strong>Department:</strong> {profile.department || "N/A"}
      </p>

      <p 
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate(`/division/${profile.division}`)}
      >
        <strong>Division:</strong> {profile.division ? profile.division : "N/A"}
      </p>
    </div>
  );
}