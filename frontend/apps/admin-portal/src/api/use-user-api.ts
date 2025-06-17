import { useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api";

const keys = {
  all: () => ["users"] as const,
};

export const useUsers = () => {
  const { trpcClient } = useApi();
  return useQuery({
    queryKey: keys.all(),
    queryFn: () => trpcClient.getUsers.query(),
  });
};
