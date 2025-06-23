import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "./api-provider";

export const useUsers = () => {
  const trpc = useTRPC();
  return useQuery(trpc.users.getAll.queryOptions());
};
