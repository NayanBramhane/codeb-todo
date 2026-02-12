import type { LoginValues } from "@/schemas/auth.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export async function loginService(data: LoginValues): Promise<boolean> {
  try {
    const response = await axios.post("/api/v1/users/login", data, {
      withCredentials: true, // for jwt
    });

    toast.success(response.data.message || "Welcome back!");
    return true;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    toast.error(error.response?.data?.message || "Login failed");
    return false;
  }
}
