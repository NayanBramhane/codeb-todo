import type { LoginValues } from "@/schemas/auth.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { type RegisterValues } from "@/schemas/auth.schema";

// Login function
export async function loginService(data: LoginValues): Promise<boolean> {
  try {
    const response = await axios.post("/api/v1/users/login", data, {
      withCredentials: true, // for jwt
    });
    console.log(response);

    toast.success(response.data.message || "Welcome back!");
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Login failed");
    return false;
  }
}

// Logout function
export const logoutService = async () => {
  try {
    const response = await axios.get("/api/v1/users/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

// Registration function
export async function registerService(data: RegisterValues): Promise<boolean> {
  try {
    const response = await axios.post("/api/v1/users/register", data);
    toast.success(response.data.message || "Registration successful!");
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    const errorMsg = error.response?.data?.message || "Something went wrong";
    toast.error(errorMsg);
    return false;
  }
}
