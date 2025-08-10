import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const shipmentMeasurements: ResourceDefinition = {
  name: "shipment_measurements",
  table: "shipment_measurements",
  key: "id",
  selectable: [
    "id",
    "total_weight_id",
    "total_volume_id",
    "created_at",
    "updated_at",
    "chargeable_weight_id"
  ],
  relations: [],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    total_weight_id: z.number().int().optional(),
    total_volume_id: z.number().int().optional(),
    chargeable_weight_id: z.number().int().optional(),
  }),
  updateSchema: z.object({
    total_weight_id: z.number().int().optional(),
    total_volume_id: z.number().int().optional(),
    chargeable_weight_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default shipmentMeasurements;
