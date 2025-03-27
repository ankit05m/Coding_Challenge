// src/components/Todo.tsx
import React from "react";
import { TaskAndId } from "./types";

interface TaskProps {
  task: TaskAndId;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, onDelete, onUpdate }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <p>Title: {task.name}</p>
      <p>{task.description}</p>
      <button onClick={() => onUpdate(task._id)}>
        {task.complete ? "Completed" : "Mark as Complete"}
      </button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
