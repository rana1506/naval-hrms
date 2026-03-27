import { useState } from "react";
import axios from "../api/axios";

export default function DOEditSailor({ sailor }) {
  const [rank, setRank] = useState(sailor.rank);
  const [fullName, setFullName] = useState(sailor.fullName);

  const update = async () => {
    await axios.patch(`/profile/edit/${sailor._id}`, {
      rank,
      fullName,
    });
    alert("Profile updated");
  };

  return (
    <div className="card">
      <h4>Edit Profile</h4>
      <input value={rank} onChange={(e) => setRank(e.target.value)} />
      <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <button onClick={update}>Update</button>
    </div>
  );
}