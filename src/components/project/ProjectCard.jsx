import {
  ProjectIcon,
  TrashIcon,
  EditIcon,
  CalendarIcon,
} from "../common/Icons";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const {
    status = "not-started",
    priority = "low",
    dueDate = "",
    description = "",
  } = project;

  const completion =
    project.tasks?.length > 0
      ? Math.round(
          (project.tasks.filter((t) => t.status === "done").length /
            project.tasks.length) *
            100,
        )
      : 0;

  return (
    <div className="project-card-refined">
      <div className="project-card-header">
        <div className="project-header-left">
          <div className="project-icon">
            <ProjectIcon size={24} />
          </div>
          <div className="project-badges">
            <div
              className={`status-badge status-${status.replace(/\s+/g, "-")}`}
            >
              {status.replace("-", " ")}
            </div>
            <div className="priority-badge">{priority.toUpperCase()}</div>
          </div>
        </div>
        <div className="project-actions">
          <button
            className="project-edit-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            title="Edit Project"
          >
            <EditIcon size={18} strokeWidth={2} />
          </button>
          <button
            className="project-delete-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            title="Delete Project"
          >
            <TrashIcon size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="project-card-body">
        <h3 className="project-title-refined">{project.title}</h3>
        {description && (
          <p className="project-description-clamped">{description}</p>
        )}

        <div className="project-meta-info">
          <p className="project-tasks-count">
            {project.tasks?.length || 0} Tasks
          </p>
          {dueDate && (
            <div className="project-due-date">
              <CalendarIcon size={14} />
              {dueDate}
            </div>
          )}
        </div>
      </div>

      <div className="project-card-footer-refined">
        <div className="project-progress-label">
          <span>Progress</span>
          <span className="progress-percent">{completion}%</span>
        </div>
        <div className="project-progress-bg">
          <div
            className="project-progress-bar"
            style={{ width: `${completion}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
