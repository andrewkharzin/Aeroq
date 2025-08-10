import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const permissions: ResourceDefinition = {
  name: "permissions",
  table: "permissions",
  key: "id",
  selectable: [
    "id",
    "name",
    "description"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
  updateSchema: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default permissions;
