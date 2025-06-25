import type { CreateThingRequest } from "@repo/server/types";
import { Card, CardContent } from "@repo/ui-kit/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCreateThing } from "../../../api/use-thing-api";
import { PageView } from "../../../components/common/page-view";
import { ThingForm } from "../../../components/things/thing-form";

export const Route = createFileRoute("/things/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutateAsync: createThing, isPending, error } = useCreateThing();

  const onSubmit = async (data: CreateThingRequest) => {
    await createThing(data);
    navigate({ to: "/things" });
  };

  const onCancel = () => {
    navigate({ to: "/things" });
  };

  return (
    <PageView title="Create thing">
      <Card>
        <CardContent>
          <ThingForm
            onSubmit={(request) => onSubmit(request as CreateThingRequest)}
            onCancel={onCancel}
            isPending={isPending}
            error={error}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
