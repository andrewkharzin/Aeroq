import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const agentClientTypes: ResourceDefinition = {
  name: "agent_client_types",
  table: "agent_client_types",
  key: ["agent_id", "client_type"],
  selectable: [
    "agent_id",
    "client_type"
  ],
  relations: ["agents"],
  defaultOrder: { column: "agent_id", desc: false },
  createSchema: z.object({
    agent_id: z.number().int(),
    client_type: z.enum(["SHIPPER", "CONSIGNEE", "AGENT", "CARRIER"]),
  }),
  updateSchema: z.object({
    agent_id: z.number().int().optional(),
    client_type: z.enum(["SHIPPER", "CONSIGNEE", "AGENT", "CARRIER"]).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default agentClientTypes;
