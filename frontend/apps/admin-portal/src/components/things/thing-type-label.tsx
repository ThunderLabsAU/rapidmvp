import type { ThingType } from "@repo/server/types";

export const getThingTypeLabel = (type: ThingType) => {
  switch (type) {
    case "thingamabob":
      return "Thingamabob";
    case "whatchamacallit":
      return "Whatchamacallit";
    case "doohickey":
      return "Doohickey";
    default:
      return type;
  }
};

export const ThingTypeLabel = ({ type }: { type: ThingType }) => {
  return <span>{getThingTypeLabel(type)}</span>;
};
