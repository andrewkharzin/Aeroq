import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const userRoles: ResourceDefinition = {
  name: "user_roles",
  table: "user_roles",
  key: ["user_id", "role_id"],
  selectable: [
    "user_id",
    "role_id",
    "context"
  ],
  relations: ["auth.users", "roles"],
  defaultOrder: { column: "user_id", desc: false },
  createSchema: z.object({
    user_id: z.string().uuid(),
    role_id: z.string().uuid(),
    context: z.record(z.any()).optional(),
  }),
  updateSchema: z.object({
    user_id: z.string().uuid().optional(),
    role_id: z.string().uuid().optional(),
    context: z.record(z.any()).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default userRoles;
