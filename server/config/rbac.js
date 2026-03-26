import { ROLES } from "./roles.js";

export const RBAC = {
  [ROLES.ADMIN]: [{ resource: "*", action: "*" }],
  [ROLES.CO]: [{ resource: "*", action: "*" }],

  [ROLES.XO]: [
    { resource: "user", action: "approve-officer" },
    { resource: "user", action: "view-all" },
    { resource: "department", action: "view" },
    { resource: "division", action: "view" }
  ],

  [ROLES.RO]: [
    { resource: "user", action: "approve-sailor" },
    { resource: "department", action: "assign" },
    { resource: "user", action: "view-sailors" }
  ],

  [ROLES.GO]: [
    { resource: "division", action: "assign" },
    { resource: "division", action: "view" }
  ],

  [ROLES.DO]: [
    { resource: "division", action: "manage" },
    { resource: "sailor", action: "edit" },
    { resource: "sailor", action: "view" }
  ],

  [ROLES.SAILOR]: [
    { resource: "profile", action: "view" }
  ]
};