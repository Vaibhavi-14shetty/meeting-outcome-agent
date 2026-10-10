
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TaskContext = createContext(null);
const STORAGE_KEY = "meeting_tasks";

function readTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(readTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTasks = useCallback((newTasks) => {
    const normalized = newTasks.map((task, index) => ({
      ...task,
      id: task.id || `task-${Date.now()}-${index}`,
      status: task.status || "Pending",
      priority: ["High", "Medium", "Low"].includes(task.priority)
        ? task.priority
        : "Medium",
    }));

    setTasks((current) => [...normalized, ...current]);
  }, []);

  const updateTaskStatus = useCallback((id, status) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);

  const clearTasks = useCallback(() => {
    setTasks([]);
  }, []);

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "Pending").length,
    inProgress: tasks.filter(
      (task) => task.status === "In Progress"
    ).length,
    completed: tasks.filter(
      (task) => task.status === "Completed"
    ).length,
  }), [tasks]);

  const value = useMemo(() => ({
    tasks,
    stats,
    addTasks,
    updateTaskStatus,
    deleteTask,
    clearTasks,
  }), [
    tasks,
    stats,
    addTasks,
    updateTaskStatus,
    deleteTask,
    clearTasks,
  ]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider.");
  }

  return context;
}