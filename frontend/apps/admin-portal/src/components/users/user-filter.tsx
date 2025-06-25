import type { SearchUsersRequest } from "@repo/server/types";
import { Input } from "@repo/ui-kit/components/core/input";
import { debounce } from "lodash";
import { useCallback } from "react";

interface Props {
  filter: SearchUsersRequest;
  onFilterChange: (filter: SearchUsersRequest) => void;
}

export const UserFilter = ({ filter, onFilterChange }: Props) => {
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onFilterChange({ keywords: value });
    }, 300),
    [onFilterChange]
  );

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search users..."
        defaultValue={filter.keywords}
        onChange={(e) => debouncedOnChange(e.target.value)}
      />
    </div>
  );
};
