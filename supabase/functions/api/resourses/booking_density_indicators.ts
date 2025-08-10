import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingDensityIndicators: ResourceDefinition = {
  name: "booking_density_indicators",
  table: "booking_density_indicators",
  key: "code",
  selectable: [
    "code",
    "description",
    "weight_volume_ratio",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "code", desc: false },
  createSchema: z.object({
    code: z.enum(["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]),
    description: z.string(),
    weight_volume_ratio: z.number(),
  }),
  updateSchema: z.object({
    description: z.string().optional(),
    weight_volume_ratio: z.number().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingDensityIndicators;
