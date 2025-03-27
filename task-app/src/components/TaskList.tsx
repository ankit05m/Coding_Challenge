// src/components/TodoList.tsx
import React from "react";
import { TaskAndId } from "./types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: TaskAndId[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
