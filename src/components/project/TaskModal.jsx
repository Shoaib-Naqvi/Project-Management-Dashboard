import { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSave, initialData, defaultStatus }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: defaultStatus || 'todo',
    priority: 'medium',
    assignee: { name: 'Syed Shoaib', avatar: '' },
    dueDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(prev => ({ ...prev, status: defaultStatus || 'todo' }));
    }
  }, [initialData, defaultStatus]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-refined">
        <header className="modal-header-refined">
          <h2>{initialData ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Task Title</label>
            <Input 
              type="text" 
              placeholder="What needs to be done?" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <Input 
              multiline
              placeholder="Add more details..." 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Status</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="modern-select"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label>Priority</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
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
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>

          <footer className="modal-footer-refined">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="pill-btn">
              {initialData ? 'Save Changes' : 'Create Task'}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};
export default TaskModal;
  
