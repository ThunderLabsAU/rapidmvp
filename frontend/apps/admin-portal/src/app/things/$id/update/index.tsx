import type { UpdateThingRequest } from "@repo/server/types";
import { Card, CardContent } from "@repo/ui-kit/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useThing, useUpdateThing } from "../../../../api/use-thing-api";
import { PageView } from "../../../../components/common/page-view";
import { ThingForm } from "../../../../components/things/thing-form";

export const Route = createFileRoute("/things/$id/update/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: thing, isLoading } = useThing(Number(id));

  const navigate = useNavigate();
  const { mutateAsync: updateUser, isPending, error } = useUpdateThing();

  const onSubmit = async (data: UpdateThingRequest) => {
    await updateUser(data);
    navigate({ to: "/things/$id", params: { id } });
  };

  const onCancel = () => {
    navigate({ to: "/things/$id", params: { id } });
  };

  return (
    <PageView title="Update thing" isLoading={isLoading}>
      <Card>
        <CardContent>
          <ThingForm
            thing={thing}
            onSubmit={(request) => onSubmit(request as UpdateThingRequest)}
            onCancel={onCancel}
            isPending={isPending}
            error={error}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
