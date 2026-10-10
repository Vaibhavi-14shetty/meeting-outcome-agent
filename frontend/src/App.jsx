
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CheckSquare,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import Dashboard from "./pages/Dashboard";
import ExtractMeeting from "./pages/ExtractMeeting";
import Tasks from "./pages/Tasks";

const navigation = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/extract", label: "Extract Meeting", icon: Sparkles },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
];

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">
            <Activity size={22} />
          </span>
          <span>
            <strong>Outcome AI</strong>
            <small>MEETING INTELLIGENCE</small>
          </span>
        </NavLink>

        <div className="nav-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {label === "Extract Meeting" && (
                <span className="nav-new">AI</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span className="tip-icon"><Sparkles size={17} /></span>
            <strong>From talk to action</strong>
            <p>Turn meeting conversations into clear next steps.</p>
            <NavLink to="/extract" className="tip-link">
              Start extracting <ArrowUpRight size={15} />
            </NavLink>
          </div>
          <div className="sidebar-footer">
            <span className="status-dot" />
            AI workspace
            <span className="version">v1.0</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <span className="topbar-eyebrow">WORKSPACE /</span>
            <span className="topbar-title"> Meeting outcomes</span>
          </div>
          <div className="topbar-status">
            <span className="status-dot" />
            <span>Local workspace</span>
          </div>
        </header>

        <div className="page-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/extract" element={<ExtractMeeting />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}