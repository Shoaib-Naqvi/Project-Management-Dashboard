import { useMemo, useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import "./Kanban.css";

const KanbanBoard = ({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onTaskMove,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { todoTasks, inProgressTasks, doneTasks } = useMemo(() => {
    return {
      todoTasks: tasks.filter((t) => t.status === "todo"),
      inProgressTasks: tasks.filter((t) => t.status === "in-progress"),
      doneTasks: tasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!over || activeId === overId || !activeTask) return;

    const newStatus = tasks.find((t) => t.id === overId)?.status ?? overId;

    if (activeTask.status !== newStatus) {
      onTaskMove(activeId, newStatus);
    }
  };

  const activeTask = useMemo(() => {
    if (!activeId) return null;
    return tasks.find(t => t.id === activeId);
  }, [activeId, tasks]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="kanban-board">
        <KanbanColumn
          id="todo"
          title="Todo"
          tasks={todoTasks}
          colorScheme="todo-column"
          onAddTask={() => onAddTask("todo")}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
        <KanbanColumn
          id="in-progress"
          title="In Progress"
          tasks={inProgressTasks}
          colorScheme="in-progress-column"
          onAddTask={() => onAddTask("in-progress")}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
        <KanbanColumn
          id="done"
          title="Done"
          tasks={doneTasks}
          colorScheme="done-column"
          onAddTask={() => onAddTask("done")}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: { active: { opacity: "0.4" } },
          }),
        }}
      >
        {activeTask ? (
          <KanbanCard task={activeTask} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
