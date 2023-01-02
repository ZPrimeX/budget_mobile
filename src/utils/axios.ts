import axios from "axios";
import { getAsyncStorage } from "./asyncStorage";

export const request = axios.create({
  baseURL: "https://budget-v2-kappa.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  async (config) => {
    const token = await getAsyncStorage("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
