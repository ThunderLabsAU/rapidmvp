import { thingTypes, type ThingType } from "@repo/server/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-kit/components/ui/select";
import { XIcon } from "lucide-react";
import { ThingTypeLabel } from "./thing-type-label";

interface Props {
  value: ThingType | null;
  onChange: (value: ThingType | null) => void;
}

export const ThingTypeSelect = ({ value, onChange }: Props) => {
  const handleValueChange = (selectedValue: string) => {
    onChange(selectedValue as ThingType);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the select from opening
    onChange(null);
  };

  return (
    <div className="relative w-full">
      <Select value={value ?? ""} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          {thingTypes.map((type) => (
            <SelectItem key={type} value={type}>
              <ThingTypeLabel type={type} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          type="button"
        >
          <XIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
