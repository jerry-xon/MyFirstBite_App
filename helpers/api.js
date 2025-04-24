// api.js
import axios from "axios";
import { TOKEN_KEY } from "../constants/token";
import { BASE_URL } from "../constants/urls";
import { getItemFromAsyncStorage } from "./asyncStorage";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await getItemFromAsyncStorage(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
