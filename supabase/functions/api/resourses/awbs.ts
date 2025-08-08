import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbs: ResourceDefinition = {
  name: "awbs",
  table: "awbs",
  key: "id",
  selectable: [
    "id",
    "awb_number",
    "owner_agent_id",
    "stock_source",
    "issued",
    "issued_at",
    "used_for_booking_id",
    "created_at",
    "updated_at",
    "status",
    "awb_stock_id",
    "booking_id"
  ],
  relations: ["agents", "awb_stocks", "booking"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    awb_number: z.string(),
    owner_agent_id: z.number().int().optional(),
    stock_source: z.enum(["HQ", "Agent"]),
    issued: z.boolean().default(false),
    issued_at: z.string().optional(),
    used_for_booking_id: z.number().int().optional(),
    status: z.enum(["available", "issued", "used", "cancelled", "voided"]).default("available"),
    awb_stock_id: z.number().int().optional(),
    booking_id: z.number().int().optional(),
  }),
  updateSchema: z.object({
    awb_number: z.string().optional(),
    owner_agent_id: z.number().int().optional(),
    stock_source: z.enum(["HQ", "Agent"]).optional(),
    issued: z.boolean().optional(),
    issued_at: z.string().optional(),
    used_for_booking_id: z.number().int().optional(),
    status: z.enum(["available", "issued", "used", "cancelled", "voided"]).optional(),
    awb_stock_id: z.number().int().optional(),
    booking_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbs;
