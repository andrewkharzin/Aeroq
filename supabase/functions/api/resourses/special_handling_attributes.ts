import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const specialHandlingAttributes: ResourceDefinition = {
  name: "special_handling_attributes",
  table: "special_handling_attributes",
  key: "id",
  selectable: [
    "id",
    "code",
    "name",
    "description",
    "created_at"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
  }),
  updateSchema: z.object({
    code: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default specialHandlingAttributes;
