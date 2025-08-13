import { ButtonLink } from "@repo/ui-kit/components/ui/button-link";
import { createFileRoute } from "@tanstack/react-router";
import { useThing } from "../../../../api/use-thing-api";
import { PageView } from "../../../components/common/page-view";
import { ThingDetails } from "../../../components/things/thing-details";

export const Route = createFileRoute("/things/$thingId/")({
  component: Index,
});

function Index() {
  const { thingId } = Route.useParams();
  const { data: thing, isLoading } = useThing(thingId);
  return (
    <PageView
      title={thing?.name ?? "Thing"}
      backTo={{
        label: "Back to things",
        href: "/things",
      }}
      actions={
        <ButtonLink to="/things/$thingId/update" params={{ thingId }}>
          Edit thing
        </ButtonLink>
      }
      isLoading={isLoading}
    >
      {thing && <ThingDetails thing={thing} />}
    </PageView>
  );
}
