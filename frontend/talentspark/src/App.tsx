import Welcome from "./components/welcome";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Login from "./pages/login";
import { useEffect, useState } from "react";
import { getCompanies } from "./Services/CompanyServices";
import type { Company } from "./types/company";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getCompanies(token)
      .then(setCompanies)
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) return <Login onLogin={handleLogin} onSwitchToRegister={() => {}} />;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavBar />
      <button onClick={handleLogout}>Logout</button>
      <Welcome />
      <br />
      <CompanyCard companies={companies} onedit={() => {}} onedelete={() => {}} oneadd={() => {}} />
      <JobCard />
      <Footer />
    </>
  );
}
export default App;