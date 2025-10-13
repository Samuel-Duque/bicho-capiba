import { getApiInstance } from "@/hooks/Api";

export const fetchAnimals = async () => {
  try {
    const api = getApiInstance();
    const response = await api.get("/animals");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};
