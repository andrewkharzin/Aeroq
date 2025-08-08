import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const currency: ResourceDefinition = {
  name: "currency",
  table: "currency",
  key: "id",
  selectable: [
    "id",
    "code",
    "name",
    "created_at",
    "updated_at"
  ],
  relations: [],
  defaultOrder: { column: "code", desc: false },
  createSchema: z.object({
    id: z.string().max(10),
    code: z.string().length(3),
    name: z.string().max(50),
  }),
  updateSchema: z.object({
    code: z.string().length(3).optional(),
    name: z.string().max(50).optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default currency;
