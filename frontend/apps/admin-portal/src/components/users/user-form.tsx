import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateUserRequest,
  createUserRequestSchema,
  type UpdateUserRequest,
  updateUserRequestSchema,
  type User,
  userRoles,
} from "@repo/server/types";
import { ActionButton } from "@repo/ui-kit/components/ui/action-button";
import { Button } from "@repo/ui-kit/components/ui/button";
import { ErrorMessage } from "@repo/ui-kit/components/ui/error-message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui-kit/components/ui/form";
import { Input } from "@repo/ui-kit/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-kit/components/ui/select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  user?: User;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  error: any | null;
}

const defaultValues = (user?: User) => ({
  id: user?.id ?? undefined,
  firstName: user?.firstName ?? "",
  lastName: user?.lastName ?? "",
  email: user?.email ?? "",
  role: user?.role ?? "user",
  password: "",
});

export function UserForm({
  onSubmit,
  onCancel,
  isPending,
  error,
  user,
}: Props) {
  const form = useForm<CreateUserRequest | UpdateUserRequest>({
    resolver: zodResolver(
      !!user ? updateUserRequestSchema : createUserRequestSchema
    ),
    defaultValues: defaultValues(user),
  });

  useEffect(() => {
    form.reset(defaultValues(user));
  }, [user]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} disabled={!!user} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!user && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" value={field.value ?? ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  disabled={!!user}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorMessage error={error} />
        <div className="flex gap-2">
          <ActionButton type="submit" isBusy={isPending}>
            Submit
          </ActionButton>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
