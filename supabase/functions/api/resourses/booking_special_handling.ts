import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingSpecialHandling: ResourceDefinition = {
  name: "booking_special_handling",
  table: "booking_special_handling",
  key: ["booking_business_id", "handling_code"],
  selectable: [
    "booking_business_id",
    "handling_code",
    "created_at"
  ],
  relations: ["booking", "special_handling_codes"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    booking_business_id: z.number().int(),
    handling_code: z.string(),
  }),
  updateSchema: z.object({
    booking_business_id: z.number().int().optional(),
    handling_code: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingSpecialHandling;
