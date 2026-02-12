import type { getTodosResponse } from "@/lib/utils";
import axios from "axios";

// get all todos with pagination and search
export const getTodos = async (
  page = 1,
  limit = 10,
  keyword = "",
): Promise<getTodosResponse> => {
  let apiUrl = `api/v1/todos?page=${page}&limit=${limit}`;
  if (keyword && keyword.trim().length > 0) {
    apiUrl += `&keyword=${keyword}`;
  }
  const response = await axios.get(apiUrl);

  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch todos");
  }

  return response.data;
};

// create a new todo
export const createTodo = async (title: string, description: string) => {
  const response = await axios.post("/api/v1/todos", { title, description });
  return response.data;
};

// delete a todo by id
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`/api/v1/todos/${id}`);
  return response.data;
};

// update a todo by id
export const updateTodo = async (
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
) => {
  const response = await axios.put(`/api/v1/todos/${id}`, {
    title,
    description,
    isCompleted,
  });
  return response.data;
};
