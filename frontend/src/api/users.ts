import { PaginatedUsersResponse, User } from "../types/types";
import { APIRoutes } from "../constants/apiRoutes";
import { server } from "../lib/server";

export const getUsers = async (
  pageNumber: number,
  pageSize: number = 4
): Promise<PaginatedUsersResponse> => {
  try {
    const api = await server();
    const res = await api.get(
      `${APIRoutes.USERS}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return { users: res.data, total: res.data.length };
  } catch (err: any) {
    console.error("Failed to fetch users:", err.message);
    return { users: [], total: 0 };
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const api = await server();
    const res = await api.get(`${APIRoutes.USERS}/${userId}`);
    console.log("Fetched user:", res.data);
    return res.data;
  } catch (err: any) {
    console.error(`Failed to fetch user with ID ${userId}:`, err.message);
    throw err;
  }
};
