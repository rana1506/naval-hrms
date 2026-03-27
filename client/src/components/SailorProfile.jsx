export default function SailorProfile({ profile }) {
  return (
    <div className="card">
      <h3>My Profile</h3>
      <p>Rank: {profile.rank}</p>
      <p>Service No: {profile.serviceNo}</p>
      <p>Department: {profile.department || "N/A"}</p>
      <p>Division: {profile.division ? profile.division : "N/A"}</p>
    </div>
  );
}