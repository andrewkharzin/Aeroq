import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const location: ResourceDefinition = {
  name: "location",
  table: "location",
  key: "id",
  selectable: [
    "id",
    "iata_code",
    "name",
    "utc_offset",
    "cntr_code"
  ],
  relations: [],
  defaultOrder: { column: "name", desc: false },
  createSchema: z.object({
    iata_code: z.string().regex(/^[A-Z]{3}$/),
    name: z.string(),
    utc_offset: z.string().optional(),
    cntr_code: z.string().optional(),
  }),
  updateSchema: z.object({
    iata_code: z.string().regex(/^[A-Z]{3}$/).optional(),
    name: z.string().optional(),
    utc_offset: z.string().optional(),
    cntr_code: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default location;
