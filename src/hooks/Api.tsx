import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://workplace-serves-seeking-microwave.trycloudflare.com";
const withCredentials = true;

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: `${baseUrl}/api`,
    timeout: 30000,
    withCredentials,
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          await instance.post("/user/auth/logout");
        } catch (logoutError) {
          return Promise.reject(logoutError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

let apiInstance: ReturnType<typeof createApiInstance> | null = null;

export const getApiInstance = () => {
  if (!apiInstance) {
    apiInstance = createApiInstance();
  }
  return apiInstance;
};
