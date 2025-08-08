import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbIataMessages: ResourceDefinition = {
  name: "awb_iata_messages",
  table: "awb_iata_messages",
  key: "id",
  selectable: [
    "id",
    "awb_issued_record_id",
    "message_type",
    "message_version",
    "message_text",
    "message_number",
    "created_at",
    "updated_at",
    "status",
    "error_details"
  ],
  relations: ["awb_issued_records"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    awb_issued_record_id: z.number().int(),
    message_type: z.enum(["FWB", "FHL", "FSU", "FFM", "FMA"]),
    message_version: z.number().int().default(1),
    message_text: z.string(),
    message_number: z.string(),
    status: z.enum(["GENERATED", "SENT", "CONFIRMED", "ERROR"]).default("GENERATED"),
    error_details: z.string().optional(),
  }),
  updateSchema: z.object({
    awb_issued_record_id: z.number().int().optional(),
    message_type: z.enum(["FWB", "FHL", "FSU", "FFM", "FMA"]).optional(),
    message_version: z.number().int().optional(),
    message_text: z.string().optional(),
    message_number: z.string().optional(),
    status: z.enum(["GENERATED", "SENT", "CONFIRMED", "ERROR"]).optional(),
    error_details: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbIataMessages;
