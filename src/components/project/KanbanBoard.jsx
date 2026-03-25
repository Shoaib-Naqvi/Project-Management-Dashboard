import { useMemo } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
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

  const handleDragEnd = (event) => {
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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
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
    </DndContext>
  );
};

export default KanbanBoard;
