import { memo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import KanbanCard from "./KanbanCard";
import "./Kanban.css";
import { PlusIcon } from "../common/Icons";

const KanbanColumn = memo(({ id, title, tasks, colorScheme, onAddTask, onEditTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={`kanban-column ${colorScheme}`}>
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          {title}
          <span className="kanban-column-count">{tasks.length}</span>
        </div>
        <button 
          className="add-task-btn" 
          onClick={onAddTask}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
        >
          <PlusIcon size={20} strokeWidth={2} />
        </button>
      </div>
      
      <div ref={setNodeRef} className="kanban-cards-container">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="empty-column-msg" style={{ padding: '24px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>
              No tasks yet
            </div>
          ) : (
            tasks.map((task) => (
              <KanbanCard 
                key={task.id} 
                task={task} 
                onClick={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
});

export default KanbanColumn;
