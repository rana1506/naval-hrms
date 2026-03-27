import { useState } from "react";
import DOEditSailor from "./DOEditSailor";
import DOLeaveControl from "./DOLeaveControl";
import DOWelfareControl from "./DOWelfareControl";
import DOPromotionControl from "./DOPromotionControl";

export default function DOSailorCard({ sailor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <p>{sailor.fullName} — {sailor.rank}</p>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide" : "Manage"}
      </button>

      {expanded && (
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