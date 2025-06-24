import { useAuth0 } from "@auth0/auth0-react";
import type { AdminApiRouter } from "@repo/server/api";
import { useQueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import superjson from "superjson";
import { config } from "../config";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AdminApiRouter>();

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AdminApiRouter>({
      links: [
        httpBatchLink({
          url: `${config.server.baseUrl}/api/admin`,
          transformer: superjson,
          headers() {
            return (async () => {
              const token = await getAccessTokenSilently();
              if (token) {
                return {
                  authorization: `Bearer ${token}`,
                };
              }
              return {};
            })();
          },
        }),
      ],
    })
  );

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      {children}
    </TRPCProvider>
  );
};
