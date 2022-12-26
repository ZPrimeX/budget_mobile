import axios from "axios";

export const request = axios.create({
  baseURL: "https://budget-v2-kappa.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
