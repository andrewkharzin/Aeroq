import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const airlineTariffs: ResourceDefinition = {
  name: "airline_tariffs",
  table: "airline_tariffs",
  key: "id",
  selectable: [
    "id",
    "product_code",
    "origin",
    "destination",
    "tariff_type",
    "min_rate",
    "weight_rates",
    "valid_from",
    "valid_to",
    "currency",
    "includes_vat",
    "airline_id"
  ],
  relations: ["location", "airlines"],
  defaultOrder: { column: "valid_from", desc: true },
  createSchema: z.object({
    product_code: z.string(),
    origin: z.string(),
    destination: z.string(),
    tariff_type: z.enum(["GENERAL", "SPECIAL", "CONTRACT", "SPOT"]),
    min_rate: z.number(),
    weight_rates: z.record(z.any()).optional(),
    valid_from: z.string(),
    valid_to: z.string(),
    currency: z.string().default("RUB"),
    includes_vat: z.boolean().default(true),
    airline_id: z.number().int(),
  }),
  updateSchema: z.object({
    product_code: z.string().optional(),
    origin: z.string().optional(),
    destination: z.string().optional(),
    tariff_type: z.enum(["GENERAL", "SPECIAL", "CONTRACT", "SPOT"]).optional(),
    min_rate: z.number().optional(),
    weight_rates: z.record(z.any()).optional(),
    valid_from: z.string().optional(),
    valid_to: z.string().optional(),
    currency: z.string().optional(),
    includes_vat: z.boolean().optional(),
    airline_id: z.number().int().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default airlineTariffs;
