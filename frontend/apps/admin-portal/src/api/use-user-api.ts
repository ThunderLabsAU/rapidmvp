import type { SearchUsersRequest } from "@repo/server/types/user";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "./api-provider";

export const useSearchUsers = (request: SearchUsersRequest) => {
  const trpc = useTRPC();
  return useQuery(trpc.users.search.queryOptions(request));
};
