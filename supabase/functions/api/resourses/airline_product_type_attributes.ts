import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const airlineProductTypeAttributes: ResourceDefinition = {
  name: "airline_product_type_attributes",
  table: "airline_product_type_attributes",
  key: ["product_type_id", "attribute_id"],
  selectable: [
    "product_type_id",
    "attribute_id"
  ],
  relations: ["airline_product_types", "special_handling_attributes"],
  defaultOrder: { column: "product_type_id", desc: false },
  createSchema: z.object({
    product_type_id: z.number().int(),
    attribute_id: z.number().int(),
  }),
  updateSchema: z.object({
    product_type_id: z.number().int().optional(),
    attribute_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default airlineProductTypeAttributes;
