import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateThingRequest,
  createThingRequestSchema,
  type Thing,
  type UpdateThingRequest,
  updateThingRequestSchema,
} from "@repo/server/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui-kit/components/ui/form";
import { FormActions } from "@repo/ui-kit/components/ui/form-actions";
import { Input } from "@repo/ui-kit/components/ui/input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ThingTypeSelect } from "./thing-type-select";

interface Props {
  thing?: Thing;
  onSubmit: (data: CreateThingRequest | UpdateThingRequest) => Promise<void>;
  onCancel: () => void;
  isPending: boolean;
  error: any | null;
}

const defaultValues = (thing?: Thing) => ({
  id: thing?.id ?? undefined,
  name: thing?.name ?? "",
  description: thing?.description ?? "",
  type: thing?.type ?? "thingamabob",
});

export function ThingForm({
  onSubmit,
  onCancel,
  isPending,
  error,
  thing,
}: Props) {
  const form = useForm<CreateThingRequest | UpdateThingRequest>({
    resolver: zodResolver(
      !!thing ? updateThingRequestSchema : createThingRequestSchema
    ),
    defaultValues: defaultValues(thing),
  });

  useEffect(() => {
    form.reset(defaultValues(thing));
  }, [thing]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <ThingTypeSelect
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormActions error={error} isPending={isPending} onCancel={onCancel} />
      </form>
    </Form>
  );
}
