import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const cargoMarkings: ResourceDefinition = {
  name: "cargo_markings",
  table: "cargo_markings",
  key: "id",
  selectable: [
    "id",
    "cargo_piece_id",
    "marking_type",
    "marking_code",
    "description",
    "is_required",
    "created_at",
    "created_by"
  ],
  relations: ["cargo_pieces", "auth.users"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    cargo_piece_id: z.number().int(),
    marking_type: z.enum(["SHIPPING", "HAZARDOUS", "FRAGILE", "TEMPERATURE", "CUSTOM"]),
    marking_code: z.string(),
    description: z.string().optional(),
    is_required: z.boolean().default(false),
    created_by: z.string().uuid(),
  }),
  updateSchema: z.object({
    cargo_piece_id: z.number().int().optional(),
    marking_type: z.enum(["SHIPPING", "HAZARDOUS", "FRAGILE", "TEMPERATURE", "CUSTOM"]).optional(),
    marking_code: z.string().optional(),
    description: z.string().optional(),
    is_required: z.boolean().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default cargoMarkings;
