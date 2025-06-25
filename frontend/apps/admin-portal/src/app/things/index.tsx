import type { SearchThingsRequest } from "@repo/server/types";
import { ButtonLink } from "@repo/ui-kit/components/ui/button-link";
import { Card, CardContent } from "@repo/ui-kit/components/ui/card";
import { useSearchRequest } from "@repo/ui-kit/hooks/use-search-request";
import { createFileRoute } from "@tanstack/react-router";
import { useSearchThings } from "../../api/use-thing-api";
import { PageView } from "../../components/common/page-view";
import { ThingDataTable } from "../../components/things/thing-data-table";
import { ThingFilter } from "../../components/things/thing-filter";

export const Route = createFileRoute("/things/")({
  component: Index,
});

function Index() {
  const { request, setRequest, setPagination, setSorting } =
    useSearchRequest<SearchThingsRequest>({});
  const { data, isLoading } = useSearchThings(request);

  return (
    <PageView
      title="Things"
      actions={<ButtonLink to="/things/create">Create thing</ButtonLink>}
    >
      <Card>
        <CardContent className="flex flex-col gap-4">
          <ThingFilter filter={request} onFilterChange={setRequest} />
          <ThingDataTable
            isLoading={isLoading}
            things={data}
            onPaginationChange={setPagination}
            sortBy={request.sortBy ?? []}
            onSortingChange={setSorting}
          />
        </CardContent>
      </Card>
    </PageView>
  );
}
