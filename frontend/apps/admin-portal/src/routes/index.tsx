import { createFileRoute } from "@tanstack/react-router";
import { useUsers } from "../api/use-user-api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-2">
      <h3>Users</h3>
      <div>{users?.map((user) => <div key={user.id}>{user.name}</div>)}</div>
    </div>
  );
}
