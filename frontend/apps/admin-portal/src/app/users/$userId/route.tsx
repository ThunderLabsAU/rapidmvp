import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/users/$userId")({
  component: () => <Outlet />,
  parseParams: (params) => ({
    userId: z.coerce.number().int().parse(params.userId),
  }),
});
