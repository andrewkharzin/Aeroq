import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const bookingCustomsSecurity: ResourceDefinition = {
  name: "booking_customs_security",
  table: "booking_customs_security",
  key: "id",
  selectable: [
    "id",
    "booking_id",
    "is_customs_information",
    "country_code",
    "information_identifier",
    "control_information_code",
    "supplementary_control_information",
    "created_at",
    "updated_at",
    "insurance_value",
    "insurance_currency",
    "customs_origin_code",
    "customs_destination_code"
  ],
  relations: ["booking", "currency"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    booking_id: z.number().int(),
    is_customs_information: z.boolean().default(true),
    country_code: z.string().optional(),
    information_identifier: z.string().optional(),
    control_information_code: z.string().optional(),
    supplementary_control_information: z.string().optional(),
    insurance_value: z.number().optional(),
    insurance_currency: z.string().optional(),
    customs_origin_code: z.string().optional(),
    customs_destination_code: z.string().optional(),
  }),
  updateSchema: z.object({
    booking_id: z.number().int().optional(),
    is_customs_information: z.boolean().optional(),
    country_code: z.string().optional(),
    information_identifier: z.string().optional(),
    control_information_code: z.string().optional(),
    supplementary_control_information: z.string().optional(),
    insurance_value: z.number().optional(),
    insurance_currency: z.string().optional(),
    customs_origin_code: z.string().optional(),
    customs_destination_code: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default bookingCustomsSecurity;
