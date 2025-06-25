import { ProtectedRoute } from "@repo/ui-kit/components/auth/protetected-route";
import { Toaster } from "@repo/ui-kit/components/core/sonner";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { HeaderNavBar } from "../components/common/header-nav-bar";

export const Route = createRootRoute({
  component: () => (
    <ProtectedRoute>
      <div className="min-h-screen h-screen flex flex-col bg-gray-50">
        <HeaderNavBar />
        <main className="pt-16 flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <Toaster
          toastOptions={{
            classNames: {
              error: "bg-red-200",
            },
          }}
        />
        <TanStackRouterDevtools />
      </div>
      <TanStackRouterDevtools />
    </ProtectedRoute>
  ),
});
