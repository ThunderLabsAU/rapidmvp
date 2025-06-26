"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { Skeleton } from "./skeleton";
interface DataTableProps<TData, TValue> {
  isLoading: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  sorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  onRowClicked?: (item: TData) => void;
  rowClassName?: (item: TData) => string;
}

export function DataTable<TData, TValue>({
  isLoading,
  columns,
  data,
  totalRows,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  onRowClicked,
  rowClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalRows,
    onPaginationChange: (updater) => {
      if (!pagination) {
        return;
      }
      const updated =
        typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange?.(updated);
    },
    onSortingChange: (updater) => {
      if (!sorting) {
        return;
      }
      const updated =
        typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange?.(updated);
    },
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={`skeleton-col-${column.id}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={[
                    onRowClicked && "cursor-pointer",
                    rowClassName?.(row.original),
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onRowClicked?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <DataTablePagination
          table={table}
          totalRows={totalRows ?? data.length}
        />
      )}
    </div>
  );
}
