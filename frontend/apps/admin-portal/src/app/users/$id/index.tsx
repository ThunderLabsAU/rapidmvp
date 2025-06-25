import { ButtonLink } from "@repo/ui-kit/components/ui/button-link";
import { createFileRoute } from "@tanstack/react-router";
import { useUser } from "../../../api/use-user-api";
import { PageView } from "../../../components/common/page-view";
import { UserDetails } from "../../../components/users/user-details";

export const Route = createFileRoute("/users/$id/")({
  component: Index,
});

function Index() {
  const { id } = Route.useParams();
  const { data: user, isLoading } = useUser(Number(id));
  return (
    <PageView
      title={user?.firstName + " " + user?.lastName}
      backTo={{
        label: "Back to users",
        href: "/users",
      }}
      actions={
        <ButtonLink to="/users/$id/update" params={{ id }}>
          Edit user
        </ButtonLink>
      }
      isLoading={isLoading}
    >
      {user && <UserDetails user={user} />}
    </PageView>
  );
}
