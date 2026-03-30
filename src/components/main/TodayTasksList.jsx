import { useState } from "react";
import "./TodayTasksList.css";
import { CheckIcon } from "../common/Icons";

const TodayTasksList = ({ tasks }) => {
  const [activeTab, setActiveTab] = useState("All");

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "To Do":
        return todoTasks;
      case "In Progress":
        return inProgressTasks;
      case "Done":
        return doneTasks;
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="today-tasks-container">
      <div className="tasks-header">
        <h2 className="tasks-title">All Tasks</h2>
        <div className="tasks-tabs">
          <div
            className={`tab ${activeTab === "All" ? "active" : ""}`}
            onClick={() => setActiveTab("All")}
          >
            All <span className="badge">{tasks.length}</span>
          </div>
          <div
            className={`tab ${activeTab === "To Do" ? "active" : ""}`}
            onClick={() => setActiveTab("To Do")}
          >
            To Do <span className="badge">{todoTasks.length}</span>
          </div>
          <div
            className={`tab ${activeTab === "In Progress" ? "active" : ""}`}
            onClick={() => setActiveTab("In Progress")}
          >
            In Progress <span className="badge">{inProgressTasks.length}</span>
          </div>
          <div
            className={`tab ${activeTab === "Done" ? "active" : ""}`}
            onClick={() => setActiveTab("Done")}
          >
            Done <span className="badge">{doneTasks.length}</span>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-tasks">No tasks matching this status.</p>
        ) : (
          filteredTasks.slice(0, 10).map((task) => {
            let statusLabel = "To Do";
            let statusClass = "task-status-ongoing";
            if (task.status === "done") {
              statusLabel = "Completed";
              statusClass = "task-status-approved";
            } else if (task.status === "in-progress") {
              statusLabel = "In Progress";
              statusClass = "task-status-review";
            }

            return (
              <div key={task.id} className="task-row">
                <div className="task-info">
                  <div
                    className={`task-checkbox ${task.status === "done" ? "checked" : ""}`}
                  >
                    {task.status === "done" && (
                      <CheckIcon size={12} strokeWidth={3} color="white" />
                    )}
                  </div>
                  <span className="task-name">{task.title}</span>
                </div>
                <div className={`task-status-pill ${statusClass}`}>
                  {statusLabel}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodayTasksList;
