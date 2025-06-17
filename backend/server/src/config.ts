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
};

if (missing.length > 0) {
  console.error(`Missing ${missing.length} required environment variables`, {
    missing,
  });
  //throw new Error(`Missing ${missing.length} required environment variables`);
}
