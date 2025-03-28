// src/App.tsx
import React, { useState, useEffect } from "react";
import { Task, TaskAndId } from "./types";
import TaskList from "./TaskList";
import { createTask, fetchTasks, deleteTask, updateTask } from "../taskApi";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskAndId[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    description: "",
    complete: false,
  });

  const getTasks = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch tasks from API on component mount
  useEffect(() => {
    getTasks();
  }, []);

  // Handle creating a new task
  const handleCreateTask = async () => {
    try {
      const newTaskItem = {
        name: newTask.name,
        description: newTask.description,
        complete: newTask.complete,
      };
      const createdTodo = await createTask(newTaskItem);
      setTasks((prevTasks) => [...prevTasks, createdTodo]);
      setNewTask({ name: "", description: "", complete: false });
      getTasks();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      getTasks();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle updating a task (toggle complete)
  const handleUpdateTask = async (id: string) => {
    try {
      await updateTask(id, { complete: true }); // Example of marking a task as complete
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="card">
      <h1>Task App</h1>
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            placeholder="Task Name"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <textarea
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            placeholder="Task Description"
            style={{ width: "100%", height: "60px" }}
          />
        </div>
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />
    </div>
  );
};

export default App;
