import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const cargoTypes: ResourceDefinition = {
  name: "cargo_types",
  table: "cargo_types",
  key: "id",
  selectable: [
    "id",
    "type_code",
    "name",
    "description",
    "iata_code",
    "required_documents",
    "special_handling_required",
    "created_at",
    "updated_at",
    "default_handling"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    type_code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    iata_code: z.string().optional(),
    required_documents: z.array(z.string()).default([]),
    special_handling_required: z.boolean().default(false),
    default_handling: z.record(z.any()).default({
      default_storage_days: 0,
      handling_requirements: []
    }),
  }),
  updateSchema: z.object({
    type_code: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    iata_code: z.string().optional(),
    required_documents: z.array(z.string()).optional(),
    special_handling_required: z.boolean().optional(),
    default_handling: z.record(z.any()).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default cargoTypes;
