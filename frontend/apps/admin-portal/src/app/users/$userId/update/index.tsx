import type { UpdateUserRequest } from "@repo/server/types";
import { Card, CardContent } from "@repo/ui-kit/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useUpdateUser, useUser } from "../../../../api/use-user-api";
import { PageView } from "../../../../components/common/page-view";
import { UserForm } from "../../../../components/users/user-form";

export const Route = createFileRoute("/users/$userId/update/")({
  component: Index,
});

function Index() {
  const { userId } = Route.useParams();
  const { data: user, isLoading } = useUser(userId);

  const navigate = useNavigate();
  const { mutateAsync: updateUser, isPending, error } = useUpdateUser();

  const onSubmit = async (data: UpdateUserRequest) => {
    await updateUser(data);
    navigate({ to: "/users/$userId", params: { userId } });
  };

  const onCancel = () => {
    navigate({ to: "/users/$userId", params: { userId } });
  };

  return (
    <PageView title="Update user" isLoading={isLoading}>
      <Card>
        <CardContent>
          <UserForm
            user={user}
            onSubmit={(request) => onSubmit(request as UpdateUserRequest)}
            onCancel={onCancel}
            isPending={isPending}
            error={error}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
