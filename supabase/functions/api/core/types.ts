// supabase/functions/api/core/types.ts
import type { z } from 'https://esm.sh/zod@3.23.8'

export type Json = Record<string, unknown>

export type ResourceDefinition = {
  name: string // e.g., "bookings" (URL segment)
  table: string // e.g., "bookings" (DB table)
  key: string // e.g., "id" (primary key column)
  selectable?: string[] // default columns if fields not provided
  relations?: string[] // relation names the resource allows to include
  defaultOrder?: { column: string, desc?: boolean }

  createSchema?: z.ZodTypeAny
  updateSchema?: z.ZodTypeAny

  allow?: { list?: boolean, get?: boolean, create?: boolean, update?: boolean, delete?: boolean }
  rbac?: (p: { roles: string[], method: string }) => boolean
}

export type Registry = Record<string, ResourceDefinition>

export type ParsedQuery = {
  limit: number
  offset: number
  sort: string[] // ["-created_at","reference"]
  fields: string[] // sparse fieldset
  include: string[] // relations to include
  filters: Array<{ field: string, op: string, value: string }>
}
