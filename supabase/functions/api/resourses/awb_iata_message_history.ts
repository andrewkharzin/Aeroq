import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbIataMessageHistory: ResourceDefinition = {
  name: "awb_iata_message_history",
  table: "awb_iata_message_history",
  key: "id",
  selectable: [
    "id",
    "original_message_id",
    "message_text",
    "version_number",
    "created_at",
    "changed_fields",
    "changed_by"
  ],
  relations: ["awb_iata_messages"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    original_message_id: z.number().int(),
    message_text: z.string(),
    version_number: z.number().int(),
    changed_fields: z.record(z.any()).optional(),
    changed_by: z.string().optional(),
  }),
  updateSchema: z.object({
    original_message_id: z.number().int().optional(),
    message_text: z.string().optional(),
    version_number: z.number().int().optional(),
    changed_fields: z.record(z.any()).optional(),
    changed_by: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbIataMessageHistory;
