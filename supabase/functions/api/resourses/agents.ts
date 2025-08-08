import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const agents: ResourceDefinition = {
  name: "agents",
  table: "agents",
  key: "id",
  selectable: [
    "id",
    "account_number",
    "name",
    "additional_name",
    "short_name",
    "type",
    "hierarchy_type",
    "branch_code",
    "sales_area_code",
    "status",
    "stockholder",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    account_number: z.string().max(30),
    name: z.string().max(100),
    additional_name: z.string().max(100).optional(),
    short_name: z.string().max(20).optional(),
    type: z.enum(["AGENT", "SUB_AGENT", "BRANCH", "SALES_OFFICE"]),
    hierarchy_type: z.enum(["Local", "Regional", "Global"]).default("Local"),
    branch_code: z.string().length(3),
    sales_area_code: z.string().length(3),
    status: z.enum([
      "Active",
      "Old Code",
      "Black List",
      "Out of Business",
      "Inactive",
      "No Invoice",
      "Invoice",
      "Cash",
      "Debit Note",
      "Shipper Inv",
      "Tech Stores"
    ]).default("Active"),
    stockholder: z.boolean().default(false),
  }),
  updateSchema: z.object({
    account_number: z.string().max(30).optional(),
    name: z.string().max(100).optional(),
    additional_name: z.string().max(100).optional(),
    short_name: z.string().max(20).optional(),
    type: z.enum(["AGENT", "SUB_AGENT", "BRANCH", "SALES_OFFICE"]).optional(),
    hierarchy_type: z.enum(["Local", "Regional", "Global"]).optional(),
    branch_code: z.string().length(3).optional(),
    sales_area_code: z.string().length(3).optional(),
    status: z.enum([
      "Active",
      "Old Code",
      "Black List",
      "Out of Business",
      "Inactive",
      "No Invoice",
      "Invoice",
      "Cash",
      "Debit Note",
      "Shipper Inv",
      "Tech Stores"
    ]).optional(),
    stockholder: z.boolean().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default agents;
