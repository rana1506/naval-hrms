import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import SailorProfile from "../components/SailorProfile";
import SailorLeave from "../components/SailorLeave";
import SailorWelfare from "../components/SailorWelfare";
import SailorPromotions from "../components/SailorPromotions";

export default function SailorDashboard() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("/profile/me").then(res => setProfile(res.data));
  }, []);

  if (!profile) return <div className="card">Loading...</div>;

  return (
    <div className="card">
      <h2>Sailor Dashboard</h2>
      <p>Welcome, {user.fullName}</p>

      <SailorProfile profile={profile} />
      <SailorLeave />
      <SailorWelfare />
      <SailorPromotions />
    </div>
  );
}