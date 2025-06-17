import { adminTrpc } from "../admin-api.context";

const { router, procedure } = adminTrpc;

export const adminUsersApiRouter = router({
  getAll: procedure.query(async () => {
    return [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ];
  }),
});
