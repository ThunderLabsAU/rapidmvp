import type { AdminApiRouter } from "@repo/server/api";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createContext, type ReactNode, useState } from "react";
import superjson from "superjson";

export interface ApiProviderType {
  trpcClient: ReturnType<typeof createTRPCClient<AdminApiRouter>>;
}

export const ApiContext = createContext<ApiProviderType | undefined>(undefined);

interface Props {
  baseUrl: string;
  children: ReactNode;
}

export const ApiProvider = ({ children, baseUrl }: Props) => {
  const [trpcClient] = useState(() =>
    createTRPCClient<AdminApiRouter>({
      links: [
        httpBatchLink({
          url: baseUrl,
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <ApiContext.Provider value={{ trpcClient }}>{children}</ApiContext.Provider>
  );
};
