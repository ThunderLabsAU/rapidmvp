import type { SearchThingsRequest } from "@repo/server/types";
import { Input } from "@repo/ui-kit/components/ui/input";
import { debounce } from "lodash";
import { useCallback } from "react";
import { ThingTypeSelect } from "./thing-type-select";

interface Props {
  filter: SearchThingsRequest;
  onFilterChange: (filter: SearchThingsRequest) => void;
}

export const ThingFilter = ({ filter, onFilterChange }: Props) => {
  const debouncedOnChange = useCallback(
    debounce((value: string) => {
      onFilterChange({ keywords: value });
    }, 300),
    [onFilterChange]
  );

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search things..."
        defaultValue={filter.keywords}
        onChange={(e) => debouncedOnChange(e.target.value)}
      />
      <ThingTypeSelect
        value={filter.type ?? null}
        onChange={(value) =>
          onFilterChange({ ...filter, type: value ?? undefined })
        }
      />
    </div>
  );
};
