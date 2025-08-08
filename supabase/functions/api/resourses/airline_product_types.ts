import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const airlineProductTypes: ResourceDefinition = {
  name: "airline_product_types",
  table: "airline_product_types",
  key: "id",
  selectable: [
    "id",
    "airline_id",
    "cargo_type_code",
    "code",
    "name",
    "description",
    "is_dangerous_goods",
    "is_special_cargo",
    "requires_ramp_attention",
    "product_attributes",
    "created_at",
    "updated_at"
  ],
  relations: ["airlines", "cargo_types"],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    airline_id: z.number().int(),
    cargo_type_code: z.string(),
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    is_dangerous_goods: z.boolean().default(false),
    is_special_cargo: z.boolean().default(false),
    requires_ramp_attention: z.boolean().default(false),
    product_attributes: z.record(z.any()).default({
      default_storage_days: null,
      handling_requirements: [],
      override_cargo_type_settings: false
    }),
  }),
  updateSchema: z.object({
    airline_id: z.number().int().optional(),
    cargo_type_code: z.string().optional(),
    code: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    is_dangerous_goods: z.boolean().optional(),
    is_special_cargo: z.boolean().optional(),
    requires_ramp_attention: z.boolean().optional(),
    product_attributes: z.record(z.any()).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default airlineProductTypes;
