import type { Page } from "@repo/server/types/page";
import type { SortBy } from "@repo/server/types/sort";
import type { User } from "@repo/server/types/user";

import { DataTable } from "@repo/ui-kit/components/core/data-table";
import { DataTableColumnHeader } from "@repo/ui-kit/components/core/data-table-column-header";
import { Link } from "@tanstack/react-router";
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
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "lastName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <div>
              <Link
                to="/users/$id"
                params={{ id: row.original.id.toString() }}
                className="hover:underline"
              >
                {row.original.firstName} {row.original.lastName}
              </Link>
            </div>
          );
        },
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
      />
    </>
  );
};
