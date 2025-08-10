import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingEawbEvents: ResourceDefinition = {
  name: "booking_eawb_events",
  table: "booking_eawb_events",
  key: "id",
  selectable: [
    "id",
    "bookingId",
    "eventType",
    "eventTime",
    "messageId",
    "userId",
    "details"
  ],
  relations: ["booking", "booking_edi_messages", "auth.users"],
  defaultOrder: { column: "eventTime", desc: true },
  createSchema: z.object({
    bookingId: z.number().int(),
    eventType: z.enum(["CREATED", "SENT", "CONFIRMED", "ERROR", "CANCELLED", "UPDATED"]),
    eventTime: z.string().default(() => new Date().toISOString()),
    messageId: z.number().int().optional(),
    userId: z.string().uuid().optional(),
    details: z.record(z.any()).optional(),
  }),
  updateSchema: z.object({
    bookingId: z.number().int().optional(),
    eventType: z.enum(["CREATED", "SENT", "CONFIRMED", "ERROR", "CANCELLED", "UPDATED"]).optional(),
    eventTime: z.string().optional(),
    messageId: z.number().int().optional(),
    userId: z.string().uuid().optional(),
    details: z.record(z.any()).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingEawbEvents;
