const missing: string[] = [];

const required = (key: string) => {
  if (!process.env[key]) {
    missing.push(key);
  }
  return process.env[key] || "not-set";
};

export const config = {
  port: process.env.PORT || 8080,
  logLevel: process.env.LOG_LEVEL || "info",
  portals: {
    adminPortalUrl: required("ADMIN_PORTAL_URL"),
  },
  db: {
    host: required("DB_HOST"),
    username: required("DB_USERNAME"),
    password: required("DB_PASSWORD"),
    database: required("DB_DATABASE"),
    port: parseInt(process.env.DB_PORT || "5432"),
    ssl: process.env.DB_SSL === "true",
  },
  auth: {
    audience: required("AUTH0_AUDIENCE"),
    issuerBaseUrl: required("AUTH0_ISSUER_BASE_URL"),
    managementApi: {
      domain: required("AUTH0_MANAGEMENT_API_DOMAIN"),
      clientId: required("AUTH0_MANAGEMENT_API_CLIENT_ID"),
      clientSecret: required("AUTH0_MANAGEMENT_API_SECRET"),
    },
  },
};

if (missing.length > 0) {
  console.error(`Missing ${missing.length} required environment variables`, {
    missing,
  });
  //throw new Error(`Missing ${missing.length} required environment variables`);
}
