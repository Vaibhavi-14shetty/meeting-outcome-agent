
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";

const statCards = [
  {
    key: "total",
    label: "Total tasks",
    icon: ListTodo,
    color: "violet",
    description: "Extracted action items",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    color: "amber",
    description: "Waiting to be started",
  },
  {
    key: "inProgress",
    label: "In progress",
    icon: TrendingUp,
    color: "blue",
    description: "Currently being worked on",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "green",
    description: "Successfully finished",
  },
];

export default function Dashboard() {
  const { tasks, stats } = useTasks();

  const recentTasks = tasks.slice(0, 5);
  const completion = stats.total
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  return (
    <div className="page fade-in">
      <section className="welcome-row">
        <div>
          <div className="eyebrow"><Sparkles size={14} /> YOUR AI WORKSPACE</div>
          <h1>Turn meetings into <span className="gradient-text">momentum.</span></h1>
          <p className="page-subtitle">
            Every decision, owner, and deadline — organized in one place.
          </p>
        </div>
        <Link to="/extract" className="button button-primary">
          <Plus size={17} /> Extract a meeting
        </Link>
      </section>

      <section className="stat-grid">
        {statCards.map(({ key, label, icon: Icon, color, description }) => (
          <article className="stat-card" key={key}>
            <div className={`stat-icon ${color}`}><Icon size={19} /></div>
            <div className="stat-label">{label}</div>
            <div className="stat-number">{stats[key]}</div>
            <div className="stat-description">{description}</div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel progress-panel">
          <div className="panel-heading">
            <div>
              <h2>Execution progress</h2>
              <p>Track how much of your extracted work is complete.</p>
            </div>
            <span className="panel-icon"><TrendingUp size={18} /></span>
          </div>

          <div className="progress-number-row">
            <span className="progress-number">{completion}%</span>
            <span className="muted">{stats.completed} of {stats.total} tasks</span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Task completion"
          >
            <div className="progress-fill" style={{ width: `${completion}%` }} />
          </div>

          <div className="progress-legend">
            <span><i className="legend-dot completed-dot" /> Completed</span>
            <span><i className="legend-dot pending-dot" /> Remaining</span>
          </div>

          {!stats.total && (
            <div className="empty-hint">
              Your progress will appear after your first meeting is extracted.
            </div>
          )}
        </article>

        <article className="panel quick-panel">
          <div className="panel-heading">
            <div>
              <h2>Quick start</h2>
              <p>Go from conversation to action.</p>
            </div>
            <span className="panel-icon"><Sparkles size={18} /></span>
          </div>

          <div className="quick-steps">
            <div className="quick-step">
              <span className="step-number">01</span>
              <div>
                <strong>Add a transcript</strong>
                <p>Paste meeting notes or upload a text file.</p>
              </div>
            </div>
            <div className="quick-step">
              <span className="step-number">02</span>
              <div>
                <strong>Extract outcomes</strong>
                <p>Gemini identifies tasks, owners, and deadlines.</p>
              </div>
            </div>
            <div className="quick-step">
              <span className="step-number">03</span>
              <div>
                <strong>Track execution</strong>
                <p>Update task status as work progresses.</p>
              </div>
            </div>
          </div>

          <Link to="/extract" className="text-link">
            Start with a transcript <ArrowRight size={16} />
          </Link>
        </article>
      </section>

      <section className="panel recent-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent action items</h2>
            <p>Your latest extracted tasks.</p>
          </div>
          <Link to="/tasks" className="text-link">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {recentTasks.length ? (
          <div className="recent-list">
            {recentTasks.map((task) => (
              <div className="recent-task" key={task.id}>
                <span className={`task-check ${task.status === "Completed" ? "is-complete" : ""}`}>
                  {task.status === "Completed" && <CheckCircle2 size={16} />}
                </span>
                <div className="recent-task-main">
                  <strong>{task.task}</strong>
                  <span>{task.owner || "Owner not assigned"} · {task.deadline || "No deadline"}</span>
                </div>
                <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state compact-empty">
            <div className="empty-icon"><ListTodo size={24} /></div>
            <h3>No action items yet</h3>
            <p>Extract your first meeting to see its tasks here.</p>
            <Link to="/extract" className="button button-secondary">
              Extract meeting <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}