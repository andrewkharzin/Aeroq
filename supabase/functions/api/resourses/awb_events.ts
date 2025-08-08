import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbEvents: ResourceDefinition = {
  name: "awb_events",
  table: "awb_events",
  key: "id",
  selectable: [
    "id",
    "awb_id",
    "event_type",
    "actor_user_id",
    "agent_id",
    "related_booking_id",
    "notes",
    "created_at"
  ],
  relations: ["awbs", "auth.users", "agents"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    awb_id: z.number().int().optional(),
    event_type: z.enum(["assigned", "issued", "used", "cancelled", "voided", "released"]),
    actor_user_id: z.string().uuid().optional(),
    agent_id: z.number().int().optional(),
    related_booking_id: z.number().int().optional(),
    notes: z.string().optional(),
  }),
  updateSchema: z.object({
    awb_id: z.number().int().optional(),
    event_type: z.enum(["assigned", "issued", "used", "cancelled", "voided", "released"]).optional(),
    actor_user_id: z.string().uuid().optional(),
    agent_id: z.number().int().optional(),
    related_booking_id: z.number().int().optional(),
    notes: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbEvents;
