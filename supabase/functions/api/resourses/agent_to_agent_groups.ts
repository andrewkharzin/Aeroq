import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const agentToAgentGroups: ResourceDefinition = {
  name: "agent_to_agent_groups",
  table: "agent_to_agent_groups",
  key: ["agent_id", "agent_group_id"],
  selectable: [
    "agent_id",
    "agent_group_id"
  ],
  relations: ["agents", "agent_groups"],
  defaultOrder: { column: "agent_id", desc: false },
  createSchema: z.object({
    agent_id: z.number().int(),
    agent_group_id: z.number().int(),
  }),
  updateSchema: z.object({
    agent_id: z.number().int().optional(),
    agent_group_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default agentToAgentGroups;
