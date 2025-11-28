import { getUsers } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import { PaginatedUsersResponse } from "../types/types";

export const useUsers = (pageNumber: number) =>
  useQuery<PaginatedUsersResponse>({
    queryKey: ["users", pageNumber],
    queryFn: () => getUsers(pageNumber),
  });
