import type { CreateUserRequest } from "@repo/server/types";
import { Card, CardContent } from "@repo/ui-kit/components/core/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCreateUser } from "../../../api/use-user-api";
import { PageView } from "../../../components/common/page-view";
import { UserForm } from "../../../components/users/user-form";

export const Route = createFileRoute("/users/create/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { mutateAsync: createUser, isPending, error } = useCreateUser();

  const onSubmit = async (data: CreateUserRequest) => {
    await createUser(data);
    navigate({ to: "/users" });
  };

  const onCancel = () => {
    navigate({ to: "/users" });
  };

  return (
    <PageView title="Create user">
      <Card>
        <CardContent>
          <UserForm
            onSubmit={(request) => onSubmit(request as CreateUserRequest)}
            onCancel={onCancel}
            isPending={isPending}
            error={error}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
