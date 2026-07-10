import Welcome from "./components/welcome";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import { getCompanies, createCompany, updateCompany, deleteCompany } from "./Services/CompanyServices";
import { getJobs, createJob, updateJob, deleteJob } from "./Services/JobServices";
import type { Company } from "./types/company";
import type { Job } from "./types/job";
import Chat from "./pages/chat";
import Resume from "./pages/resume";
import JobSearch from "./pages/jobsearch";
import Interview from "./pages/interview";

type View = "dashboard" | "chat" | "resume" | "jobsearch" | "interview";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("dashboard");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setView("dashboard");
  };

  const refreshCompanies = () => {
    if (!token) return;
    getCompanies(token)
      .then(setCompanies)
      .catch(() => setError("Network error"));
  };

  const refreshJobs = () => {
    if (!token) return;
    getJobs(token)
      .then(setJobs)
      .catch(() => setError("Network error"));
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      getCompanies(token).then(setCompanies),
      getJobs(token).then(setJobs),
    ])
      .catch(() => setError("Network error"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAddCompany = async (company: Company) => {
    if (!token) return;
    try {
      await createCompany(company, token);
      refreshCompanies();
    } catch (err) {
      alert("Failed to add company — check you have permission.");
    }
  };

  const handleEditCompany = async (company: Company) => {
    if (!token) return;
    try {
      await updateCompany(String(company.id), company, token);
      refreshCompanies();
    } catch (err) {
      alert("Failed to update company — check you have permission.");
    }
  };

  const handleDeleteCompany = async (id: number) => {
    if (!token) return;
    try {
      await deleteCompany(String(id), token);
      refreshCompanies();
    } catch (err) {
      alert("Failed to delete company — check you have permission.");
    }
  };

  const handleAddJob = async (job: Omit<Job, "id">) => {
    if (!token) return;
    try {
      await createJob(job, token);
      refreshJobs();
    } catch (err) {
      alert("Failed to add job — check you have permission.");
    }
  };

  const handleEditJob = async (job: Job) => {
    if (!token) return;
    try {
      await updateJob(job.id, job, token);
      refreshJobs();
    } catch (err) {
      alert("Failed to update job — check you have permission.");
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!token) return;
    try {
      await deleteJob(id, token);
      refreshJobs();
    } catch (err) {
      alert("Failed to delete job — check you have permission.");
    }
  };

  if (!token) {
    if (showRegister) {
      return (
        <div className="auth-page">
          <Register onSwitchToLogin={() => setShowRegister(false)} />
        </div>
      );
    }
    return (
      <div className="auth-page">
        <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <NavBar current={view} onNavigate={setView} onLogout={handleLogout} />
      <main className="main-content">
        {loading && <p className="page-subtitle">Loading...</p>}
        {error && <p className="page-subtitle">Error: {error}</p>}

        {!loading && !error && view === "dashboard" && (
          <>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Companies and open roles at a glance.</p>
            <Welcome />
            <CompanyCard
              companies={companies}
              onedit={handleEditCompany}
              onedelete={handleDeleteCompany}
              oneadd={handleAddCompany}
            />
            <JobCard
              jobs={jobs}
              onedit={handleEditJob}
              onedelete={handleDeleteJob}
              oneadd={handleAddJob}
            />
          </>
        )}

        {!loading && !error && view === "chat" && <Chat token={token} />}
        {!loading && !error && view === "resume" && <Resume token={token} />}
        {!loading && !error && view === "jobsearch" && <JobSearch />}
        {!loading && !error && view === "interview" && <Interview token={token} />}

        <Footer />
      </main>
    </div>
  );
}
export default App;