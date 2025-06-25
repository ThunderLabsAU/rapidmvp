import type { SearchUsersRequest } from "@repo/server/types";
import { ButtonLink } from "@repo/ui-kit/components/core/button-link";
import { Card, CardContent } from "@repo/ui-kit/components/core/card";
import { useSearchRequest } from "@repo/ui-kit/hooks/use-search-request";
import { createFileRoute } from "@tanstack/react-router";
import { useSearchUsers } from "../../api/use-user-api";
import { PageView } from "../../components/common/page-view";
import { UserDataTable } from "../../components/users/user-data-table";
import { UserFilter } from "../../components/users/user-filter";

export const Route = createFileRoute("/users/")({
  component: Index,
});

function Index() {
  const { request, setRequest, setPagination, setSorting } =
    useSearchRequest<SearchUsersRequest>({});
  const { data, isLoading } = useSearchUsers(request);

  return (
    <PageView
      title="Users"
      actions={<ButtonLink to="/users/create">Create user</ButtonLink>}
    >
      <Card>
        <CardContent className="flex flex-col gap-4">
          <UserFilter filter={request} onFilterChange={setRequest} />
          <UserDataTable
            isLoading={isLoading}
            users={data}
            onPaginationChange={setPagination}
            sortBy={request.sortBy ?? []}
            onSortingChange={setSorting}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
