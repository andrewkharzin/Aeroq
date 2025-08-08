import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const accountNumberSequences: ResourceDefinition = {
  name: "account_number_sequences",
  table: "account_number_sequences",
  key: "type",
  selectable: [
    "type",
    "current_seq"
  ],
  relations: [],
  defaultOrder: { column: "type", desc: false },
  createSchema: z.object({
    type: z.string(),
    current_seq: z.number().int().default(0),
  }),
  updateSchema: z.object({
    current_seq: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default accountNumberSequences;
