import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const rolePermissions: ResourceDefinition = {
  name: "role_permissions",
  table: "role_permissions",
  key: ["role_id", "permission_id"],
  selectable: [
    "role_id",
    "permission_id"
  ],
  relations: ["roles", "permissions"],
  defaultOrder: { column: "role_id", desc: false },
  createSchema: z.object({
    role_id: z.string().uuid(),
    permission_id: z.string().uuid(),
  }),
  updateSchema: z.object({
    role_id: z.string().uuid().optional(),
    permission_id: z.string().uuid().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default rolePermissions;
