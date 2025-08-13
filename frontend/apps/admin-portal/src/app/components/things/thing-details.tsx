import type { Thing } from "@repo/server/types";
import { Card, CardContent, CardHeader } from "@repo/ui-kit/components/ui/card";
import { Separator } from "@repo/ui-kit/components/ui/separator";
import { ThingTypeLabel } from "./thing-type-label";

export const ThingDetails = ({ thing }: { thing: Thing }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            General Details
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{thing.name}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-gray-500">Description</p>
            <p className="font-medium">{thing.description}</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">
              <ThingTypeLabel type={thing.type} />
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
