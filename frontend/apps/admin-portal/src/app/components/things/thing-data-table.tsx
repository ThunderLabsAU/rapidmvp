import type { Page, SortBy, Thing } from "@repo/server/types";
import { DataTable } from "@repo/ui-kit/components/ui/data-table";
import { DataTableColumnHeader } from "@repo/ui-kit/components/ui/data-table-column-header";
import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ThingTypeLabel } from "./thing-type-label";

export interface Props {
  isLoading: boolean;
  things: Page<Thing> | undefined;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  sortBy: SortBy[];
  onSortingChange: (sortBy: SortBy[]) => void;
}

export const ThingDataTable = ({
  things,
  isLoading,
  sortBy,
  onSortingChange,
  onPaginationChange,
}: Props) => {
  const navigate = useNavigate();

  const columns: ColumnDef<Thing>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
      },
      {
        id: "type",
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => <ThingTypeLabel type={row.original.type} />,
      },
    ],
    []
  );

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={things?.data ?? []}
        totalRows={things?.total ?? 0}
        pagination={things ?? { pageIndex: 0, pageSize: 50 }}
        sorting={
          sortBy?.map((sort) => ({
            id: sort.column,
            desc: sort.direction === "desc",
          })) ?? []
        }
        onPaginationChange={onPaginationChange}
        onSortingChange={(newSortBy) =>
          onSortingChange(
            newSortBy.map((sort) => ({
              column: sort.id,
              direction: sort.desc ? "desc" : "asc",
            }))
          )
        }
        onRowClicked={(row) => {
          navigate({ to: "/things/$thingId", params: { thingId: row.id } });
        }}
      />
    </>
  );
};
