import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const airlineVolumetricCoefficients: ResourceDefinition = {
  name: "airline_volumetric_coefficients",
  table: "airline_volumetric_coefficients",
  key: "id",
  selectable: [
    "id",
    "airline_id",
    "coefficient",
    "valid_from",
    "valid_to",
    "created_at",
    "cargo_type_id",
    "notes",
    "approved_by",
    "min_chargeable_weight"
  ],
  relations: ["airlines", "cargo_types", "auth.users"],
  defaultOrder: { column: "valid_from", desc: true },
  createSchema: z.object({
    airline_id: z.number().int(),
    coefficient: z.number().positive().default(167),
    valid_from: z.string().default(() => new Date().toISOString().split('T')[0]),
    valid_to: z.string().optional(),
    cargo_type_id: z.number().int().default(1),
    notes: z.string().optional(),
    approved_by: z.string().uuid().optional(),
    min_chargeable_weight: z.number().nonnegative().optional(),
  }),
  updateSchema: z.object({
    airline_id: z.number().int().optional(),
    coefficient: z.number().positive().optional(),
    valid_from: z.string().optional(),
    valid_to: z.string().optional(),
    cargo_type_id: z.number().int().optional(),
    notes: z.string().optional(),
    approved_by: z.string().uuid().optional(),
    min_chargeable_weight: z.number().nonnegative().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default airlineVolumetricCoefficients;
