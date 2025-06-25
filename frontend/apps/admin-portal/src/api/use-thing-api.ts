import type { SearchThingsRequest } from "@repo/server/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "./api-provider";

export const useThing = (id: number) => {
  const trpc = useTRPC();
  return useQuery(trpc.things.get.queryOptions(id));
};

export const useSearchThings = (request: SearchThingsRequest) => {
  const trpc = useTRPC();
  return useQuery(trpc.things.search.queryOptions(request));
};

export const useCreateThing = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.things.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.things.pathFilter());
      },
    })
  );
};

export const useUpdateThing = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  return useMutation(
    trpc.things.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.things.pathFilter());
      },
    })
  );
};
