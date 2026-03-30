import { Link } from "react-router-dom";
import "./ProjectSummaryTable.css";

const ProjectSummaryTable = ({ projects }) => {
  return (
    <div className="project-summary-container">
      <div className="summary-header">
        <h2 className="summary-title">Project summary</h2>
      </div>

      <div className="table-responsive">
        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Tasks</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => {
                const totalTasks = project.tasks?.length || 0;
                const completedTasks =
                  project.tasks?.filter((t) => t.status === "done").length || 0;
                const progress =
                  totalTasks > 0
                    ? Math.round((completedTasks / totalTasks) * 100)
                    : 0;

                let statusLabel = "On going";
                let statusClass = "status-ongoing";
                if (progress === 100 && totalTasks > 0) {
                  statusLabel = "Completed";
                  statusClass = "status-completed";
                } else if (progress === 0 && totalTasks > 0) {
                  statusLabel = "Not started";
                  statusClass = "status-atrisk";
                } else if (totalTasks === 0) {
                  statusLabel = "Draft";
                  statusClass = "status-draft";
                }

                return (
                  <tr key={project.id}>
                    <td>
                      <Link
                        to={`/projects/${project.id}`}
                        className="project-name-link"
                      >
                        {project.title}
                      </Link>
                    </td>
                    <td>{totalTasks} Tasks</td>
                    <td>
                      <span className={`status-pill ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td>
                      <div
                        className="circular-progress"
                        style={{
                          "--progress": `${progress}%`,
                          "--color":
                            progress === 100
                              ? "#22c55e"
                              : progress === 50
                                ? "#eab308"
                                : "#ef4444",
                        }}
                      >
                        <span>{progress}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSummaryTable;
