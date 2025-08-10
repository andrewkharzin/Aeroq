import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const specialHandlingCodes: ResourceDefinition = {
  name: "special_handling_codes",
  table: "special_handling_codes",
  key: "code",
  selectable: [
    "code",
    "description",
    "is_dangerous_goods",
    "is_special_cargo",
    "requires_ramp_attention",
    "storage_days",
    "cargo_category",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "code", desc: false },
  createSchema: z.object({
    code: z.string(),
    description: z.string(),
    is_dangerous_goods: z.boolean().default(false),
    is_special_cargo: z.boolean().default(false),
    requires_ramp_attention: z.boolean().default(false),
    storage_days: z.number().int().default(0),
    cargo_category: z.string().optional(),
  }),
  updateSchema: z.object({
    description: z.string().optional(),
    is_dangerous_goods: z.boolean().optional(),
    is_special_cargo: z.boolean().optional(),
    requires_ramp_attention: z.boolean().optional(),
    storage_days: z.number().int().optional(),
    cargo_category: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default specialHandlingCodes;
