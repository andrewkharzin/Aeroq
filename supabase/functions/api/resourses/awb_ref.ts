import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbRef: ResourceDefinition = {
  name: "awb_ref",
  table: "awb_ref",
  key: "id",
  selectable: [
    "id",
    "created_at",
    "reference_type",
    "serial",
    "consolidation",
    "booking_id",
    "is_auto_generated",
    "used_at",
    "status",
    "prefix"
  ],
  relations: ["airlines", "booking"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    reference_type: z.enum(["BOOK", "QUOTE", "AIR WAYBILL"]).default("AIR WAYBILL"),
    serial: z.string().optional(),
    consolidation: z.boolean().default(false),
    booking_id: z.number().int(),
    is_auto_generated: z.boolean().default(false),
    used_at: z.string().optional(),
    status: z.enum(["AVAILABLE", "USED", "VOIDED"]).default("AVAILABLE"),
    prefix: z.string().optional(),
  }),
  updateSchema: z.object({
    reference_type: z.enum(["BOOK", "QUOTE", "AIR WAYBILL"]).optional(),
    serial: z.string().optional(),
    consolidation: z.boolean().optional(),
    booking_id: z.number().int().optional(),
    is_auto_generated: z.boolean().optional(),
    used_at: z.string().optional(),
    status: z.enum(["AVAILABLE", "USED", "VOIDED"]).optional(),
    prefix: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbRef;
