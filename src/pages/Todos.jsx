import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTodo, setEditTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDesc, setUpdatedDesc] = useState("");
  const [updatedDeadline, setUpdatedDeadline] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos", { withCredentials: true });
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      toast.error("Failed to load todos ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/todos/${id}`, { withCredentials: true });
      toast.success("Task deleted successfully 🗑️");
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task ❌");
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setUpdatedTitle(todo.title);
    setUpdatedDesc(todo.desc || todo.disc || "");
    setUpdatedDeadline(todo.deadline || "");
  };

  const handleUpdate = async () => {
    if (!updatedTitle.trim()) return toast.error("Title cannot be empty ❌");

    try {
      await api.put(
        `/todos/${editTodo.id}/edit`,
        {
          title: updatedTitle,
          desc: updatedDesc,
          deadline: updatedDeadline,
        },
        { withCredentials: true }
      );

      toast.success("Task updated successfully ✏️");

      setTodos((prev) =>
        prev.map((t) =>
          t.id === editTodo.id
            ? {
                ...t,
                title: updatedTitle,
                desc: updatedDesc,
                disc: updatedDesc,
                deadline: updatedDeadline,
              }
            : t
        )
      );

      setEditTodo(null);
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task ❌");
    }
  };

  const handleMarkCompleted = async (id) => {
    try {
      await api.put(`/todos/${id}/complete`, {}, { withCredentials: true });
      toast.success("Marked as completed ✅");
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: true, completed_on: new Date().toISOString() } : t
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as completed ❌");
    }
  };

  const handleMarkUnCompleted = async (id) => {
    try {
      await api.put(`/todos/${id}/uncomplete`, {}, { withCredentials: true });
      toast.info("Marked as uncompleted 🔁");
      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: false, completed_on: null } : t
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as uncompleted ❌");
    }
  };

  // 🧠 Calculate readable time difference
  const getTimeDiffText = (diffMs) => {
    const diffHours = diffMs / (1000 * 60 * 60);
    if (Math.abs(diffHours) < 24) {
      const hours = Math.floor(Math.abs(diffHours));
      const mins = Math.floor((Math.abs(diffHours) * 60) % 60);
      return `${hours}h ${mins}m`;
    } else {
      const days = Math.ceil(Math.abs(diffHours / 24));
      return `${days} day${days > 1 ? "s" : ""}`;
    }
  };

  // 🧭 Status logic
  const getStatusText = (todo) => {
    const deadline = new Date(todo.deadline);
    const completedOn = todo.completed_on ? new Date(todo.completed_on) : null;
    const now = new Date();
    const diffMs = deadline - now;

    if (!todo.completed) {
      if (diffMs >= 0) return `Pending – ${getTimeDiffText(diffMs)} left`;
      return `Overdue – ${getTimeDiffText(diffMs)} late`;
    } else {
      if (completedOn <= deadline)
        return `Completed on ${completedOn.toLocaleDateString()}`;
      return `Completed late – ${getTimeDiffText(completedOn - deadline)} after deadline`;
    }
  };

  // 🔍 Filtering, searching, and sorting
  const filteredTodos = todos
    .filter((t) => {
      const now = new Date();
      const deadline = new Date(t.deadline);
      if (filter === "todo") return !t.completed && deadline >= now;
      if (filter === "pending") return !t.completed && deadline < now;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => {
      const s = search.toLowerCase();
      return t.title.toLowerCase().includes(s) || (t.desc || t.disc || "").toLowerCase().includes(s);
    })
    .sort((a, b) => {
      const da = new Date(a.deadline);
      const db = new Date(b.deadline);
      return sortOrder === "asc" ? da - db : db - da;
    });

  if (loading) return <p className="text-center mt-5">Loading todos...</p>;

  return (
    <div className="container mt-4 todos" style={{ minHeight: "200vh" }}>
      <h2 className="text-center mb-4">Your To-Dos 📝</h2>

      {/* 🔹 Filter Buttons, Search, Sort */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="btn-group mb-2">
          {["all", "todo", "pending", "completed"].map((type) => (
            <button
              key={type}
              className={`btn btn-${filter === type ? "primary" : "outline-primary"}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="form-control w-auto mb-2"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="btn btn-outline-secondary mb-2"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort by Deadline {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* 🔹 Display Todos */}
      {filteredTodos.length === 0 ? (
        <p className="text-center text-muted mt-5">
          No tasks found for this filter/search 😅
        </p>
      ) : (
        <div className="row">
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{todo.title}</h5>
                  {(todo.desc || todo.disc) && (
                    <p className="card-text text-muted">{todo.desc || todo.disc}</p>
                  )}
                  {todo.deadline && (
                    <p className="text-secondary small">
                      <strong>Deadline:</strong>{" "}
                      {new Date(todo.deadline).toLocaleDateString()}
                    </p>
                  )}

                  <p className={`badge ${todo.completed ? "bg-success" : "bg-warning text-dark"}`}>
                    {getStatusText(todo)}
                  </p>

                  <div className="mt-3 d-flex justify-content-between">
                    {!todo.completed ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleMarkCompleted(todo.id)}
                      >
                        Mark Done ✅
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleMarkUnCompleted(todo.id)}
                      >
                        Mark Un Done 🔁
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditClick(todo)}
                    >
                      Edit ✏️
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editTodo && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task ✏️</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditTodo(null)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={updatedDesc}
                    onChange={(e) => setUpdatedDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    value={updatedDeadline}
                    onChange={(e) => setUpdatedDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditTodo(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todos;
