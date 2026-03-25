import { ProjectIcon, TrashIcon } from "../common/Icons";

const ProjectCard = ({ project, onDelete }) => {
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
        <div className="project-icon">
          <ProjectIcon size={24} />
        </div>
        <button
          className="project-delete-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <TrashIcon size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="project-card-body">
        <h3 className="project-title-refined">{project.title}</h3>
        <p className="project-tasks-count">
          {project.tasks?.length || 0} Tasks
        </p>
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
