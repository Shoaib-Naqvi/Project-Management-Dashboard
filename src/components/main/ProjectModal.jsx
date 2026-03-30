import { useState, useEffect } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import "./TaskModal.css";

const ProjectModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  initialTitle = "",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else if (isOpen) {
      setFormData({
        title: initialTitle,
        description: "",
      });
    }
  }, [isOpen, initialTitle, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-refined">
        <header className="modal-header-refined">
          <h2>Create New Project</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Project Title</label>
            <Input
              type="text"
              placeholder="Enter Project Name"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <Input
              multiline
              placeholder="Enter Description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="modern-select"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="modern-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>

          <footer className="modal-footer-refined">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="pill-btn">
              {initialData ? "Save Changes" : "Create Project"}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};
export default ProjectModal;
