import axios from "axios";

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
