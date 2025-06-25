import type { SearchUsersRequest } from "@repo/server/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "./api-provider";

export const useUser = (id: number) => {
  const trpc = useTRPC();
  return useQuery(trpc.users.get.queryOptions(id));
};

export const useSearchUsers = (request: SearchUsersRequest) => {
  const trpc = useTRPC();
  return useQuery(trpc.users.search.queryOptions(request));
};

export const useCreateUser = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.users.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.users.pathFilter());
      },
    })
  );
};

export const useUpdateUser = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.users.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.users.pathFilter());
      },
    })
  );
};
