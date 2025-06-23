import { AuthProvider } from "@repo/ui-kit/providers/auth-provider";
import { ReactQueryProvider } from "@repo/ui-kit/providers/react-query-provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "./api/api-provider";
import { config } from "./config";
import "./index.css";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider
      domain={config.auth.domain}
      clientId={config.auth.clientId}
      audience={config.auth.audience}
    >
      <ReactQueryProvider>
        <ApiProvider>
          <RouterProvider router={router} />
        </ApiProvider>
      </ReactQueryProvider>
    </AuthProvider>
  </StrictMode>
);
