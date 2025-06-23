export const config = {
  server: {
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  },
  auth: {
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
  },
};
