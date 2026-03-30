import { useState } from "react";
import DOEditSailor from "./DOEditSailor";
import DOLeaveControl from "./DOLeaveControl";
import DOWelfareControl from "./DOWelfareControl";
import DOPromotionControl from "./DOPromotionControl";
import { useNavigate } from "react-router-dom";

export default function DOSailorCard({ sailor }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="card">
      <p 
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate(`/profile/view/${sailor._id}`)}
      >
        {sailor.fullName} — {sailor.rank}
      </p>

      <button onClick={() => setOpen(!open)}>
        {open ? "Hide" : "Manage"}
      </button>

      {open && (
        <div>
          <DOEditSailor sailor={sailor} />
          <DOLeaveControl sailorId={sailor._id} />
          <DOWelfareControl sailorId={sailor._id} />
          <DOPromotionControl sailorId={sailor._id} />
        </div>
      )}
    </div>
  );
}