import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const cargoPieces: ResourceDefinition = {
  name: "cargo_pieces",
  table: "cargo_pieces",
  key: "id",
  selectable: [
    "id",
    "booking_id",
    "piece_number",
    "quantity",
    "weight_value",
    "weight_unit",
    "length_cm",
    "width_cm",
    "height_cm",
    "is_stackable",
    "total_weight_kg",
    "total_volume_cbm",
    "created_by",
    "nature_of_good",
    "handling_instructions"
  ],
  relations: ["booking", "auth.users"],
  defaultOrder: { column: "piece_number", desc: false },
  createSchema: z.object({
    booking_id: z.number().int().optional(),
    piece_number: z.number().int(),
    quantity: z.number().int().default(1),
    weight_value: z.number(),
    weight_unit: z.enum(["KG", "LB"]).default("KG"),
    length_cm: z.number().int(),
    width_cm: z.number().int(),
    height_cm: z.number().int(),
    is_stackable: z.boolean().default(true),
    created_by: z.string().uuid().optional(),
    nature_of_good: z.string().optional(),
    handling_instructions: z.string().optional(),
  }),
  updateSchema: z.object({
    booking_id: z.number().int().optional(),
    piece_number: z.number().int().optional(),
    quantity: z.number().int().optional(),
    weight_value: z.number().optional(),
    weight_unit: z.enum(["KG", "LB"]).optional(),
    length_cm: z.number().int().optional(),
    width_cm: z.number().int().optional(),
    height_cm: z.number().int().optional(),
    is_stackable: z.boolean().optional(),
    nature_of_good: z.string().optional(),
    handling_instructions: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default cargoPieces;
