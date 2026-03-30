import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Kanban.css";
import { CalendarIcon, TrashIcon, EditIcon } from "../common/Icons";

const KanbanCard = memo(({ task, onClick, onDelete, isOverlay }) => {
  const { id, title, description, priority, dueDate, assignee, status } = task;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !isOverlay ? 0.3 : 1,
    zIndex: isDragging ? 1 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`kanban-card ${isOverlay ? "dragging" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="kanban-card-header">
        <div className={`status-badge status-${status}`}>
          {status.replace("-", " ")}
        </div>
        <div className="priority-badge">{priority.toUpperCase()}</div>
      </div>

      <h3 className="kanban-card-title">{title}</h3>
      <p className="kanban-card-description">{description}</p>

      {task.progress !== undefined && (
        <div className="card-progress">
          <div className="progress-bg">
            <div
              className="progress-fill"
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{task.progress}%</span>
        </div>
      )}

      <div className="kanban-card-footer">
        <div className="card-assignee">
          <img
            src={
              assignee.avatar ||
              `https://ui-avatars.com/api/?name=${assignee.name}&background=random`
            }
            alt={assignee.name}
            className="assignee-avatar"
          />
          <span className="assignee-name">{assignee.name}</span>
        </div>
        <div className="card-date">
          <CalendarIcon size={14} />
          {dueDate}
        </div>
      </div>

      <div className="kanban-card-actions">
        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          title="Edit Task"
        >
          <EditIcon size={16} strokeWidth={2} />
        </button>
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete Task"
        >
          <TrashIcon size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
});

export default KanbanCard;
