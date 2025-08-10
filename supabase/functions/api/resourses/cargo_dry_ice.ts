import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const cargoDryIce: ResourceDefinition = {
  name: "cargo_dry_ice",
  table: "cargo_dry_ice",
  key: "id",
  selectable: [
    "id",
    "pieces",
    "weight_per_piece_amount",
    "weight_per_piece_unit",
    "total_weight_amount",
    "total_weight_unit",
    "created_by",
    "created_at",
    "updated_at",
    "booking_id"
  ],
  relations: ["booking", "auth.users"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    pieces: z.number().int().optional(),
    weight_per_piece_amount: z.number().optional(),
    weight_per_piece_unit: z.enum(["KG", "LB"]).optional(),
    total_weight_amount: z.number().optional(),
    total_weight_unit: z.enum(["KG", "LB"]).optional(),
    created_by: z.string().uuid(),
    booking_id: z.number().int().optional(),
  }),
  updateSchema: z.object({
    pieces: z.number().int().optional(),
    weight_per_piece_amount: z.number().optional(),
    weight_per_piece_unit: z.enum(["KG", "LB"]).optional(),
    total_weight_amount: z.number().optional(),
    total_weight_unit: z.enum(["KG", "LB"]).optional(),
    booking_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default cargoDryIce;
