
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  ListTodo,
  Search,
  Trash2,
} from "lucide-react";

import { useTasks } from "../context/TaskContext";

const statuses = ["Pending", "In Progress", "Completed"];

export default function Tasks() {
  const { tasks, updateTaskStatus, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = [
        task.task,
        task.owner,
        task.deadline,
        task.priority,
      ].some((value) => String(value || "").toLowerCase().includes(query));

      const matchesFilter = filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  return (
    <div className="page fade-in">
      <section className="page-heading">
        <div className="eyebrow"><ListTodo size={14} /> TASK MANAGEMENT</div>
        <h1>Your action items</h1>
        <p className="page-subtitle">
          Keep owners, deadlines, and progress organized after every meeting.
        </p>
      </section>

      <section className="panel tasks-panel">
        <div className="task-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search tasks, owners, deadlines..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search tasks"
            />
          </div>

          <label className="filter-select">
            <span className="sr-only">Filter tasks by status</span>
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="All">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown size={15} />
          </label>
        </div>

        <div className="tasks-table-heading">
          <span>{filteredTasks.length} task{filteredTasks.length === 1 ? "" : "s"}</span>
          <span>STATUS CAN BE UPDATED BELOW</span>
        </div>

        {filteredTasks.length ? (
          <div className="managed-task-list">
            {filteredTasks.map((task) => (
              <article className="managed-task" key={task.id}>
                <span className={`managed-task-symbol ${task.status === "Completed" ? "is-complete" : ""}`}>
                  {task.status === "Completed" ? (
                    <CheckCircle2 size={20} />
                  ) : task.status === "In Progress" ? (
                    <Clock3 size={20} />
                  ) : (
                    <Circle size={20} />
                  )}
                </span>

                <div className="managed-task-main">
                  <strong className={task.status === "Completed" ? "completed-text" : ""}>
                    {task.task}
                  </strong>
                  <div className="managed-task-meta">
                    <span><b>Owner</b> {task.owner || "Unassigned"}</span>
                    <span><b>Deadline</b> {task.deadline || "Not specified"}</span>
                    <span className={`priority-badge ${(task.priority || "Medium").toLowerCase()}`}>
                      {task.priority || "Medium"}
                    </span>
                  </div>
                </div>

                <label className="status-select">
                  <span className="sr-only">Update status for {task.task}</span>
                  <select
                    value={task.status}
                    onChange={(event) => updateTaskStatus(task.id, event.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} />
                </label>

                <button
                  type="button"
                  className="icon-button delete-button"
                  onClick={() => {
                    if (window.confirm("Delete this task? This cannot be undone.")) {
                      deleteTask(task.id);
                    }
                  }}
                  title="Delete task"
                  aria-label={`Delete task: ${task.task}`}
                >
                  <Trash2 size={17} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon"><ListTodo size={25} /></div>
            <h3>{tasks.length ? "No matching tasks" : "Your task list is empty"}</h3>
            <p>
              {tasks.length
                ? "Try changing your search or status filter."
                : "Extract a meeting transcript to create your first action items."}
            </p>
            {!tasks.length && (
              <a href="/extract" className="button button-primary">
                Extract a meeting
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}