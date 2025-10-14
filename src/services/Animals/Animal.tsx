import { getApiInstance } from "@/hooks/Api";

export const fetchAnimals = async (page: number = 1, limit: number = 10) => {
  try {
    const api = getApiInstance();
    const response = await api.get(`/animals?page=${page}&limit=${limit}`);
    return {
      animals: response.data.result,
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};
