import { useMemo } from "react";
import "./Kanban.css";
import { ProjectIcon, ClockIcon, CheckCircleIcon } from "../common/Icons";

const KanbanStats = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const completion = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, todo, inProgress, done, completion };
  }, [tasks]);

  return (
    <div className="kanban-stats-refined">
      <div className="stat-card-refined">
        <div className="stat-icon-wrapper total">
          <ProjectIcon size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-value-refined">{stats.total}</span>
          <span className="stat-label-refined">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card-refined">
        <div className="stat-icon-wrapper in-progress">
          <ClockIcon size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-value-refined">{stats.inProgress}</span>
          <span className="stat-label-refined">In Progress</span>
        </div>
      </div>

      <div className="stat-card-refined">
        <div className="stat-icon-wrapper completion">
          <CheckCircleIcon size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-value-refined">{stats.completion}%</span>
          <span className="stat-label-refined">Completed</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanStats;
