// src/providers/ReactQueryProvider.tsx
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import { useToast } from "../hooks/use-show-error-toast";

interface Props {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const { showErrorToast } = useToast();
  const [queryClient] = useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (!query.meta?.noErrorToast) {
            showErrorToast(error);
          }
        },
      }),
      defaultOptions: {
        queries: {
          staleTime: 60000,
          retry: 2,
        },
        mutations: {
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { ReactQueryProvider };
