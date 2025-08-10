import { z } from "https://esm.sh/zod@3.23.8";
import type { ResourceDefinition } from "../core/types.ts";

const participantContact: ResourceDefinition = {
  name: "participant_contact",
  table: "participant_contact",
  key: "id",
  selectable: [
    "id",
    "participant_id",
    "phone_number",
    "fax_number",
    "email",
    "contact_person",
    "created_at",
    "updated_at"
  ],
  relations: ["participant"],
  defaultOrder: { column: "created_at", desc: true },
  createSchema: z.object({
    participant_id: z.number().int(),
    phone_number: z.string().optional(),
    fax_number: z.string().optional(),
    email: z.string().email().optional(),
    contact_person: z.string().optional(),
  }),
  updateSchema: z.object({
    participant_id: z.number().int().optional(),
    phone_number: z.string().optional(),
    fax_number: z.string().optional(),
    email: z.string().email().optional(),
    contact_person: z.string().optional(),
  }),
  allow: { list: true, get: true, create: true, update: true, delete: true },
  rbac: ({ roles, method }) => (roles.includes("admin") ? true : method !== "DELETE"),
};

export default participantContact;
