import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function ViewSailorProfile() {
  const { sailorId } = useParams();
  const [sailor, setSailor] = useState(null);

  useEffect(() => {
    axios.get(`/sailor/${sailorId}`)
      .then(res => setSailor(res.data))
      .catch(() => {});
  }, [sailorId]);

  if (!sailor) {
    return <div className="card">Loading profile...</div>;
  }

  return (
    <div className="card">
      <h2>{sailor.fullName}</h2>

      <p><strong>Rank:</strong> {sailor.rank}</p>
      <p><strong>Service No:</strong> {sailor.serviceNo}</p>

      <p><strong>Department:</strong> {sailor.department || "N/A"}</p>
      <p><strong>Division:</strong> {sailor.division?.name || "N/A"}</p>

      <h3>Details</h3>
      <p><strong>Status:</strong> {sailor.status}</p>

      <h3>Contact</h3>
      <p><i>Contact fields can be added here if needed.</i></p>

      <h3>Notes</h3>
      <p><i>Extra fields (courses, service record, conduct, etc.) can be added here.</i></p>
    </div>
  );
}