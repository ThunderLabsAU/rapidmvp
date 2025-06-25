import { useState } from "react";

interface SearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: { column: string; direction: "asc" | "desc" }[];
}

export const useSearchRequest = <T extends SearchRequest>(
  initialRequest: T
) => {
  const [request, setRequest] = useState<T>(initialRequest);

  const setPagination = (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => {
    setRequest({
      ...request,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
  };

  const setSorting = (
    sortBy: { column: string; direction: "asc" | "desc" }[]
  ) => {
    setRequest({ ...request, sortBy: sortBy });
  };

  return { request, setRequest, setPagination, setSorting };
};
