import { getApiInstance } from "@/hooks/Api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export interface OngSignupData {
  name: string;
  cnpj: string;
  email: string;
  telefone: string;
  descricao: string;
  bairro: string | null;
  rua: string | null;
  numero: string | null;
  cidade: string | null;
  estado: string | null;
  complemento: string | null;
  cep: string | null;
  quantidadeAnimais: number | null;
  responsavelTecnico: string;
  password: string;
}

export interface SignupResponse {
  user: User;
}

export interface LoginResponse {
  user: User;
  token: string;
}

const api = getApiInstance();

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const me = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const signupOng = async (
  data: OngSignupData
): Promise<SignupResponse> => {
  const response = await api.post("/ongs", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
