// auth.middleware.ts
import { type Request } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "../../config";

export const authMiddleware = auth({
  audience: config.auth.audience,
  issuerBaseURL: config.auth.issuerBaseUrl,
  tokenSigningAlg: "RS256",
});

export const getAuth0Id = (req: Request) => {
  return req.auth?.payload?.sub || null;
};

export const getPermissions = (req: Request) => {
  return (req.auth?.payload?.permissions || []) as string[];
};
