import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const participant: ResourceDefinition = {
  name: "participant",
  table: "participant",
  key: "id",
  selectable: [
    "id",
    "account_number",
    "name",
    "additional_name",
    "short_name",
    "status",
    "created_at",
    "updated_at",
    "created_by",
    "type"
  ],
  relations: ["auth.users"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    account_number: z.string().max(30),
    name: z.string(),
    additional_name: z.string().optional(),
    short_name: z.string().max(10).optional(),
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
    type: z.enum(["SHIPPER", "CONSIGNEE", "AGENT", "CARRIER"]).optional(),
    created_by: z.string().uuid().optional(),
  }),
  updateSchema: z.object({
    account_number: z.string().max(30).optional(),
    name: z.string().optional(),
    additional_name: z.string().optional(),
    short_name: z.string().max(10).optional(),
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
    type: z.enum(["SHIPPER", "CONSIGNEE", "AGENT", "CARRIER"]).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default participant;
