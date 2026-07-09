import { useState } from "react";
import { register } from "../Services/AuthServices";

type Props = {
  onSwitchToLogin: () => void;
};

function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role });
      alert("Registration successful! Please login.");
      onSwitchToLogin();
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input className="input" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (admin / candidate)" required />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <p className="auth-switch">
        Already have an account? <button type="button" onClick={onSwitchToLogin}>Login</button>
      </p>
    </div>
  );
}

export default Register;