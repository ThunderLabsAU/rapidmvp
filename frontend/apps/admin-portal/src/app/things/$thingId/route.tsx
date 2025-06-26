import { createFileRoute, Outlet } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/things/$thingId")({
  component: () => <Outlet />,
  parseParams: (params) => ({
    thingId: z.coerce.number().int().parse(params.thingId),
  }),
});
