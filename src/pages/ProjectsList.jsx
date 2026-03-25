import { Link } from "react-router-dom";
import { useProjectStore } from "../hooks/useProjectStore";
import Button from "../components/common/Button";
import ProjectCard from "../components/project/ProjectCard";
import "../components/project/ProjectCard.css";
import { useState } from "react";
import ConfirmationModal from "../components/common/ConfirmationModal";
import toast from "react-hot-toast";

export default function ProjectsList() {
  const { projects, addProject, deleteProject, searchQuery  } = useProjectStore();
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    addProject(newProjectTitle);
    toast.success(`Project "${newProjectTitle}" created successfully`);
    setNewProjectTitle("");
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      toast.success(`Project "${projectToDelete.title}" deleted successfully`);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="projects-view">
      <header className="page-header-refined">
        <div>
          <h1 className="page-title-refined">Your Projects</h1>
          <p className="page-subtitle-refined">Manage and track your project implementations</p>
        </div>
        <form onSubmit={handleSubmit} className="add-project-form">
          <input
            type="text"
            placeholder="Enter project name..."
            value={newProjectTitle}
            onChange={(e) => setNewProjectTitle(e.target.value)}
            className="modern-input"
          />
          <Button type="submit" variant="primary" className="pill-btn">
            Create Project
          </Button>
        </form>
      </header>

      <div className="projects-grid">
        {filteredProjects.length === 0 && (
          <div className="empty-state">
            <p>{searchQuery ? `No projects matching "${searchQuery}"` : "No projects yet. Start by creating one above!"}</p>
          </div>
        )}
        {filteredProjects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            style={{ textDecoration: "none" }}
          >
            <ProjectCard
              project={project}
              onDelete={() => {
                setProjectToDelete(project);
                setIsModalOpen(true);
              }}
            />
          </Link>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This will also remove the inside ${projectToDelete?.tasks?.length || 0} tasks.`}
      />
    </div>
  );
}
