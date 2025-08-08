import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const airlines: ResourceDefinition = {
  name: "airlines",
  table: "airlines",
  key: "id",
  selectable: [
    "id",
    "iata_code",
    "icao_code",
    "name",
    "is_active",
    "created_at",
    "updated_at",
    "account_number",
    "prefix"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    iata_code: z.string().length(2),
    icao_code: z.string().length(3),
    name: z.string().max(100),
    is_active: z.boolean().default(true),
    account_number: z.string().optional(),
    prefix: z.string().optional(),
  }),
  updateSchema: z.object({
    iata_code: z.string().length(2).optional(),
    icao_code: z.string().length(3).optional(),
    name: z.string().max(100).optional(),
    is_active: z.boolean().optional(),
    account_number: z.string().optional(),
    prefix: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default airlines;
