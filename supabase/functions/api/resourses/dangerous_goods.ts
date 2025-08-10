import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const dangerousGoods: ResourceDefinition = {
  name: "dangerous_goods",
  table: "dangerous_goods",
  key: "id",
  selectable: [
    "id",
    "booking_id",
    "un_number",
    "proper_shipping_name"
  ],
  relations: ["booking"],
  defaultOrder: { column: "id", desc: false },
  createSchema: z.object({
    booking_id: z.number().int(),
    un_number: z.string(),
    proper_shipping_name: z.string(),
  }),
  updateSchema: z.object({
    booking_id: z.number().int().optional(),
    un_number: z.string().optional(),
    proper_shipping_name: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default dangerousGoods;
