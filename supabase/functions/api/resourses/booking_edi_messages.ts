import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingEdiMessages: ResourceDefinition = {
  name: "booking_edi_messages",
  table: "booking_edi_messages",
  key: "messageId",
  selectable: [
    "messageId",
    "bookingId",
    "messageType",
    "messageContent",
    "sentAt",
    "status",
    "receivedAt",
    "processedAt",
    "errorDetails"
  ],
  relations: ["booking"],
  defaultOrder: { column: "sentAt", desc: true },
  createSchema: z.object({
    bookingId: z.number().int(),
    messageType: z.string(),
    messageContent: z.record(z.any()),
    status: z.enum(["PENDING", "SENT", "RECEIVED", "PROCESSED", "ERROR"]),
    receivedAt: z.string().optional(),
    processedAt: z.string().optional(),
    errorDetails: z.string().optional(),
  }),
  updateSchema: z.object({
    bookingId: z.number().int().optional(),
    messageType: z.string().optional(),
    messageContent: z.record(z.any()).optional(),
    status: z.enum(["PENDING", "SENT", "RECEIVED", "PROCESSED", "ERROR"]).optional(),
    receivedAt: z.string().optional(),
    processedAt: z.string().optional(),
    errorDetails: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingEdiMessages;
