import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const agentUsers: ResourceDefinition = {
  name: "agent_users",
  table: "agent_users",
  key: "id",
  selectable: [
    "id",
    "user_id",
    "agent_id",
    "role",
    "created_at"
  ],
  relations: ["auth.users", "agents"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    user_id: z.string().uuid().optional(),
    agent_id: z.number().int().optional(),
    role: z.string(),
  }),
  updateSchema: z.object({
    user_id: z.string().uuid().optional(),
    agent_id: z.number().int().optional(),
    role: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default agentUsers;
