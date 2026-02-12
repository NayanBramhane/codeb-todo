import { type RegisterValues } from "@/schemas/auth.schema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export async function registerService(data: RegisterValues) {
  try {
    const response = await axios.post("/api/v1/users/register", data);
    toast.success(response.data.message || "Registration successful!");
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    const errorMsg = error.response?.data?.message || "Something went wrong";
    toast.error(errorMsg);
  }
}
