import { getApiInstance } from "@/hooks/Api";

const api = getApiInstance();

export interface FavoriteAnimal {
  id: string;
  nome: string;
  image: string | null;
  sexo: "M" | "F";
  idade: string;
  raca: { id: number; nome: string; especieId: number };
  distancia: string;
  bairroOng: string;
  cidadeOng: string;
}

export interface AdoptionProcess {
  id: string;
  animalNome: string;
  animalImage: string | null;
  ongNome: string;
  status: "pending" | "approved" | "rejected";
  dataInicio: string;
  ultimaAtualizacao: string;
}

export interface UserDonation {
  id: string;
  ongNome: string;
  valor: number;
  data: string;
  status: "pending" | "completed" | "failed";
  mensagem?: string;
}

export const fetchUserFavorites = async (): Promise<FavoriteAnimal[]> => {
  try {
    const response = await api.get("/me/favorites");
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const fetchUserAdoptions = async (): Promise<AdoptionProcess[]> => {
  try {
    const response = await api.get("/adoptions");
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching user adoptions:", error);
    throw error;
  }
};

export const fetchUserDonations = async (): Promise<UserDonation[]> => {
  try {
    const response = await api.get("/me/donations");
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching user donations:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await api.put("/me", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};