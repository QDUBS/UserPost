import axios from "axios";

const baseURL =
  process.env.VITE_API_URL || "https://userpost-y1xm.onrender.com";

export const server = async () => {
  const instance = axios.create({
    baseURL,
    withCredentials: false,
  });

  return instance;
};
