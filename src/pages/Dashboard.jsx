import { useProjectStore } from "../hooks/useProjectStore";
import KanbanStats from "../components/main/KanbanStats";
import { Link } from "react-router-dom";
import ProjectCard from "../components/main/ProjectCard";
import "../components/main/ProjectCard.css";
import ProjectSummaryTable from "../components/main/ProjectSummaryTable";
import TodayTasksList from "../components/main/TodayTasksList";
import ConfirmationModal from "../components/common/ConfirmationModal";
import ProjectModal from "../components/main/ProjectModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const projects = useProjectStore((state) => state.projects);
  const searchQuery = useProjectStore((state) => state.searchQuery);
  const deleteProject = useProjectStore((state) => state.deleteProject);
  const updateProject = useProjectStore((state) => state.updateProject);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const allTasks = projects.flatMap((p) => p.tasks);
  const recentProjects = [...filteredProjects].reverse().slice(0, 3);

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      toast.success(`Project "${projectToDelete.title}" deleted successfully`);
      setProjectToDelete(null);
    }
  };

  const handleUpdateProject = (projectData) => {
    if (!projectData.title?.trim()) return;
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      toast.success(`Project "${projectData.title}" updated successfully`);
    }
    setEditingProject(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <header className="page-header-refined">
        <div>
          <h1 className="page-title-refined">Dashboard</h1>
          <p className="page-subtitle-refined">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </header>

      <KanbanStats tasks={allTasks} />

      <section className="dashboard-section">
        <div className="section-header-refined">
          <h2 className="section-title-refined">Recent Projects</h2>
          <Link to="/projects" className="section-link">
            View All
          </Link>
        </div>

        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="empty-state">
              <p>No projects created yet.</p>
              <Link to="/projects" className="link-text">
                Create your first project
              </Link>
            </div>
          ) : (
            recentProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                style={{ textDecoration: "none" }}
              >
                <ProjectCard
                  project={project}
                  onEdit={(e) => {
                    if (e) e.preventDefault();
                    setEditingProject(project);
                    setIsUpdateModalOpen(true);
                  }}
                  onDelete={() => {
                    setProjectToDelete(project);
                    setIsModalOpen(true);
                  }}
                />
              </Link>
            ))
          )}
        </div>

        <div style={{ marginTop: "40px" }}>
          <ProjectSummaryTable projects={filteredProjects} />
          <TodayTasksList tasks={allTasks} />
        </div>
      </section>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This will also remove the inside ${projectToDelete?.tasks?.length || 0} tasks.`}
      />

      <ProjectModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleUpdateProject}
        initialData={editingProject}
      />
    </div>
  );
}
