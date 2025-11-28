
import axios from "axios";
import { APIRoutes } from "../constants/apiRoutes";

export const server = async () => {
  const instance = axios.create({
    baseURL: APIRoutes.VITE_API_URL,
    withCredentials: false,
  });

  return instance;
};
