// src/api/taskApi.ts
import axios from "axios";
import { Task, TaskAndId } from "./components/types";

// Define the base URL for the API (adjust the URL as per your backend)
const API_URL = "http://localhost:5200/api/tasks"; // Replace with your API URL

// Function to fetch all tasks
export const fetchTasks = async (): Promise<TaskAndId[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Function to create a new task
export const createTask = async (task: Task): Promise<TaskAndId> => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Function to delete a task
export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// Function to update a task
export const updateTask = async (
  id: string,
  updates: Partial<Task>
): Promise<TaskAndId> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
