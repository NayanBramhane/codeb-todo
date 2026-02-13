import type { getTodosResponse } from "@/lib/utils";
import type { TodoFormValues } from "@/schemas/todo.schema";
import axios, { AxiosError } from "axios";

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
export const createTodo = async (payload: TodoFormValues) => {
  try {
    await axios.post("/api/v1/todos", payload);
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.log(error);
    return false;
  }
};

// delete a todo by id
export const deleteTodo = async (id: string) => {
  try {
    await axios.delete(`/api/v1/todos/${id}`);
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.log(error);
    return false;
  }
};

// update a todo by id
export const updateTodo = async (
  id: string,
  data: { title?: string; isCompleted?: boolean; description?: string },
) => {
  try {
    await axios.put(`/api/v1/todos/${id}`, data);
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.log(error);
    return false;
  }
};
