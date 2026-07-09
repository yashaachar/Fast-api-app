import { useState } from "react";
import { login } from "../Services/AuthServices";

type Props = {
  onLogin: (token: string) => void;
  onSwitchToRegister: () => void;
};

function Login({ onLogin, onSwitchToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      onLogin(response.access_token);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome back</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <p className="auth-switch">
        Don't have an account? <button type="button" onClick={onSwitchToRegister}>Register</button>
      </p>
    </div>
  );
}

export default Login;