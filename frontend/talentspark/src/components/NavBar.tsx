type View = "dashboard" | "chat" | "resume" | "jobsearch" | "interview";

type Props = {
  current: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
};

function NavBar({ current, onNavigate, onLogout }: Props) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">TalentSpark</div>

      <button
        className={`nav-link ${current === "dashboard" ? "active" : ""}`}
        onClick={() => onNavigate("dashboard")}
      >
        Dashboard
      </button>
      <button
        className={`nav-link ${current === "jobsearch" ? "active" : ""}`}
        onClick={() => onNavigate("jobsearch")}
      >
        Job Search
      </button>
      <button
        className={`nav-link ${current === "chat" ? "active" : ""}`}
        onClick={() => onNavigate("chat")}
      >
        Career Chat
      </button>
      <button
        className={`nav-link ${current === "resume" ? "active" : ""}`}
        onClick={() => onNavigate("resume")}
      >
        Resume Analyser
      </button>
      <button
        className={`nav-link ${current === "interview" ? "active" : ""}`}
        onClick={() => onNavigate("interview")}
      >
        AI Interview
      </button>

      <div className="sidebar-footer">
        <button className="nav-link" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;