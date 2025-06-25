import { ManagementClient } from "auth0";
import { config } from "../../config";

export const authManagement = new ManagementClient({
  domain: config.auth.managementApi.domain,
  clientId: config.auth.managementApi.clientId,
  clientSecret: config.auth.managementApi.clientSecret,
});
