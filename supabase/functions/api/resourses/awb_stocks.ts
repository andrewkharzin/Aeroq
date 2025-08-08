import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const awbStocks: ResourceDefinition = {
  name: "awb_stocks",
  table: "awb_stocks",
  key: "id",
  selectable: [
    "id",
    "agent_id",
    "awb_prefix",
    "range_start",
    "range_end",
    "stock_source",
    "assigned_by",
    "assigned_at",
    "notes"
  ],
  relations: ["agents", "auth.users"],
  defaultOrder: { column: "assigned_at", desc: true },
  createSchema: z.object({
    agent_id: z.number().int().optional(),
    awb_prefix: z.string(),
    range_start: z.string(),
    range_end: z.string(),
    stock_source: z.enum(["HQ", "Agent"]),
    assigned_by: z.string().uuid().optional(),
    notes: z.string().optional(),
  }),
  updateSchema: z.object({
    agent_id: z.number().int().optional(),
    awb_prefix: z.string().optional(),
    range_start: z.string().optional(),
    range_end: z.string().optional(),
    stock_source: z.enum(["HQ", "Agent"]).optional(),
    assigned_by: z.string().uuid().optional(),
    notes: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default awbStocks;
