import { useState } from "react";
import API from "../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await API.post("/signup", { username, email, password });
    alert("Signup successful");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <br /><br />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
