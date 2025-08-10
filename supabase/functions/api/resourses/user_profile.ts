import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const userProfile: ResourceDefinition = {
  name: "user_profile",
  table: "user_profile",
  key: "id",
  selectable: [
    "id",
    "username",
    "full_name",
    "avatar_url",
    "bio",
    "created_at",
    "updated_at",
    "role_id"
  ],
  relations: ["auth.users", "roles"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    id: z.string().uuid(),
    username: z.string().optional(),
    full_name: z.string().optional(),
    avatar_url: z.string().optional(),
    bio: z.string().optional(),
    role_id: z.string().uuid().optional(),
  }),
  updateSchema: z.object({
    username: z.string().optional(),
    full_name: z.string().optional(),
    avatar_url: z.string().optional(),
    bio: z.string().optional(),
    role_id: z.string().uuid().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default userProfile;
