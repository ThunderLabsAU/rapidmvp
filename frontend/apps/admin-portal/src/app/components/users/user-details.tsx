import type { User } from "@repo/server/types";
import { Card, CardContent, CardHeader } from "@repo/ui-kit/components/ui/card";
import { Separator } from "@repo/ui-kit/components/ui/separator";
import {
  CalendarIcon,
  LogInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from "lucide-react";

export const UserDetails = ({ user }: { user: User }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Information
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <MailIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <PhoneIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">todo</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <MapPinIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">todo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Security Details
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <ShieldIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium">{user.role}</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <LogInIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Last login</p>
              <p className="font-medium">todo</p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Created at</p>
              <p className="font-medium">
                {user.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <LogInIcon className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Last login</p>
              <p className="font-medium">todo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
