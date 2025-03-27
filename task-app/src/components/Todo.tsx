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

  // Fetch tasks from API on component mount
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
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
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Handle updating a task (toggle complete)
  const handleUpdateTask = async (id: string) => {
    try {
      const updatedTask = await updateTask(id, { complete: true }); // Example of marking a task as complete
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, complete: updatedTask.complete } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Task App</h1>
      <div>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          placeholder="Task Name"
        />
        <textarea
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          placeholder="Task Description"
        />
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
