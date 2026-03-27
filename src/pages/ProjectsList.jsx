import { Link } from "react-router-dom";
import { useProjectStore } from "../hooks/useProjectStore";
import Button from "../components/common/Button";
import ProjectCard from "../components/project/ProjectCard";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Input from "../components/common/Input";
import ProjectModal from "../components/project/ProjectModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProjectsList() {
  const { projects, addProject, deleteProject, updateProject, searchQuery  } = useProjectStore();
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditingProject(null);
    setIsCreateModalOpen(true);
  };

  const handleCreate = (projectData) => {
    if (!projectData.title.trim()) return;
    
    if (editingProject) {
      updateProject(editingProject.id, projectData);
      toast.success(`Project "${projectData.title}" updated successfully`);
    } else {
      addProject(projectData);
      toast.success(`Project "${projectData.title}" created successfully`);
    }
    
    setNewProjectTitle("");
    setEditingProject(null);
    setIsCreateModalOpen(false);
  };

  const handleDelete = () => {
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
          <Input
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
              onEdit={() => {
                setEditingProject(project);
                setIsCreateModalOpen(true);
              }}
              onDelete={() => {
                setProjectToDelete(project);
                setIsDeleteModalOpen(true);
              }}
            />
          </Link>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This will also remove the inside ${projectToDelete?.tasks?.length || 0} tasks.`}
      />

      <ProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleCreate}
        initialTitle={newProjectTitle}
        initialData={editingProject}
      />
    </div>
  );
}