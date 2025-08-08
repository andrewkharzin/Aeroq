import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingTypes: ResourceDefinition = {
  name: "booking_types",
  table: "booking_types",
  key: "code",
  selectable: [
    "code",
    "name",
    "description",
    "is_active",
    "requires_special_handling",
    "priority_level",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "priority_level", desc: false },
  createSchema: z.object({
    code: z.string().length(1),
    name: z.string().max(50),
    description: z.string().optional(),
    is_active: z.boolean().default(true),
    requires_special_handling: z.boolean().default(false),
    priority_level: z.number().int().min(1).max(10).default(5),
  }),
  updateSchema: z.object({
    name: z.string().max(50).optional(),
    description: z.string().optional(),
    is_active: z.boolean().optional(),
    requires_special_handling: z.boolean().optional(),
    priority_level: z.number().int().min(1).max(10).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingTypes;
