import { createFileRoute } from "@tanstack/react-router";
import { useUsers } from "../api/use-user-api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: users } = useUsers();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
