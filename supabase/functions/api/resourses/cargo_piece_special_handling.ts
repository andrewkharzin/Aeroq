import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const cargoPieceSpecialHandling: ResourceDefinition = {
  name: "cargo_piece_special_handling",
  table: "cargo_piece_special_handling",
  key: ["cargo_piece_id", "special_handling_code"],
  selectable: [
    "cargo_piece_id",
    "special_handling_code",
    "created_at"
  ],
  relations: ["cargo_pieces", "special_handling_codes"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    cargo_piece_id: z.number().int(),
    special_handling_code: z.string(),
  }),
  updateSchema: z.object({
    cargo_piece_id: z.number().int().optional(),
    special_handling_code: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default cargoPieceSpecialHandling;
