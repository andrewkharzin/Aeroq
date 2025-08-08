import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const agentGroups: ResourceDefinition = {
  name: "agent_groups",
  table: "agent_groups",
  key: "id",
  selectable: [
    "id",
    "short_name",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "short_name", desc: false },
  createSchema: z.object({
    short_name: z.string(),
  }),
  updateSchema: z.object({
    short_name: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default agentGroups;
