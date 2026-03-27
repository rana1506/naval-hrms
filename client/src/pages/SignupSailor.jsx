import { useState } from "react";
import axios from "../api/axios";

export default function SignupSailor() {
  const [form, setForm] = useState({
    serviceNo: "",
    rank: "",
    fullName: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/signup/sailor", form);
    alert("Sailor signup submitted. Await RO approval.");
  };

  return (
    <div className="card">
      <h2>Sailor Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Service No" onChange={(e)=>setForm({...form,serviceNo:e.target.value})}/>
        <input placeholder="Rank" onChange={(e)=>setForm({...form,rank:e.target.value})}/>
        <input placeholder="Full Name" onChange={(e)=>setForm({...form,fullName:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button>Create Account</button>
      </form>
    </div>
  );
}