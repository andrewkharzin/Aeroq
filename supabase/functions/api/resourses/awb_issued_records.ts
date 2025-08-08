import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbIssuedRecords: ResourceDefinition = {
  name: "awb_issued_records",
  table: "awb_issued_records",
  key: "id",
  selectable: [
    "id",
    "booking_id",
    "awb_number",
    "issued_at",
    "awb_data",
    "update_at",
    "updated_at"
  ],
  relations: ["booking"],
  defaultOrder: { column: "issued_at", desc: true },
  createSchema: z.object({
    booking_id: z.number().int(),
    awb_number: z.string(),
    awb_data: z.record(z.any()),
    update_at: z.string().optional(),
  }),
  updateSchema: z.object({
    booking_id: z.number().int().optional(),
    awb_number: z.string().optional(),
    awb_data: z.record(z.any()).optional(),
    update_at: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbIssuedRecords;
