import { useParams, useNavigate } from "react-router-dom";
import { useProjectStore } from "../hooks/useProjectStore";
import { useMemo, useState, useCallback } from "react";
import KanbanBoard from "../components/project/KanbanBoard";
import KanbanStats from "../components/project/KanbanStats";
import Button from "../components/common/Button";
import TaskModal from "../components/project/TaskModal";
import ConfirmationModal from "../components/common/ConfirmationModal";
import toast from "react-hot-toast";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState("todo");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const projects = useProjectStore((state) => state.projects);
  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId],
  );

  const addTask = useProjectStore((state) => state.addTask);
  const editTask = useProjectStore((state) => state.editTask);
  const deleteTask = useProjectStore((state) => state.deleteTask);
  const updateTaskStatus = useProjectStore((state) => state.updateTaskStatus);

  const handleOpenAddModal = useCallback((status = "todo") => {
    setEditingTask(null);
    setInitialStatus(typeof status === "string" ? status : "todo");
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  }, []);

  const handleTaskMove = useCallback(
    (taskId, newStatus) => {
      updateTaskStatus(projectId, taskId, newStatus);
    },
    [projectId, updateTaskStatus],
  );

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      editTask(projectId, editingTask.id, taskData);
    } else {
      addTask(projectId, taskData);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(project.id, taskToDelete);
      toast.success("Task deleted successfully");
      setTaskToDelete(null);
    }
  };

  if (!project) {
    return (
      <div className="empty-state">
        <h2>Project not found</h2>
        <Button onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  return (
    <div className="project-details-view">
      <header className="page-header-refined">
        <div>
          <h1 className="page-title-refined">{project.title}</h1>
          <p className="page-subtitle-refined">
            Manage tasks and track progress for this project
          </p>
        </div>
        <div className="header-actions">
          <Button
            variant="primary"
            onClick={() => handleOpenAddModal("todo")}
            className="pill-btn"
          >
            + Add Task
          </Button>
        </div>
      </header>

      <KanbanStats tasks={project.tasks} />

      <div className="board-container-refined">
        <KanbanBoard
          tasks={project.tasks}
          onAddTask={handleOpenAddModal}
          onEditTask={handleOpenEditModal}
          onDeleteTask={(taskId) => {
            setTaskToDelete(taskId);
            setIsDeleteModalOpen(true);
          }}
          onTaskMove={handleTaskMove}
        />
      </div>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          initialData={editingTask}
          defaultStatus={initialStatus}
        />
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
}
