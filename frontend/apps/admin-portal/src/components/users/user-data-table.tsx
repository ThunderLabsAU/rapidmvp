import type { Page, SortBy, User } from "@repo/server/types";
import { DataTable } from "@repo/ui-kit/components/ui/data-table";
import { DataTableColumnHeader } from "@repo/ui-kit/components/ui/data-table-column-header";
import { useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export interface Props {
  isLoading: boolean;
  users: Page<User> | undefined;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  sortBy: SortBy[];
  onSortingChange: (sortBy: SortBy[]) => void;
}

export const UserDataTable = ({
  users,
  isLoading,
  sortBy,
  onSortingChange,
  onPaginationChange,
}: Props) => {
  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        id: "firstName",
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="First name" />
        ),
      },
      {
        id: "lastName",
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last name" />
        ),
      },
      {
        id: "role",
        accessorKey: "role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
      },
      {
        id: "auth0Id",
        accessorKey: "auth0Id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Auth0 ID" />
        ),
      },
    ],
    []
  );

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={users?.data ?? []}
        totalRows={users?.total ?? 0}
        pagination={users ?? { pageIndex: 0, pageSize: 50 }}
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
          navigate({ to: "/users/$id", params: { id: row.id.toString() } });
        }}
      />
    </>
  );
};
