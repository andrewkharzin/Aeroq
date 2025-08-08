// supabase/functions/api/core/crud.ts
import type { ResourceDefinition } from './types.ts'
import { buildSelect, ops } from './query.ts'
import type { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

export async function listRecords(
  svc: ReturnType<typeof createClient>,
  res: ResourceDefinition,
  tenantId: string,
  q: { limit: number, offset: number, sort: string[], fields: string[], include: string[], filters: Array<{ field: string, op: string, value: string }> }
) {
  const select = buildSelect(res.selectable, q.fields, res.relations, q.include)
  let query = svc.from(res.table).select(select, { count: 'exact' }).eq('tenant_id', tenantId)

  for (const f of q.filters) {
    const method = ops.get(f.op) as string
    // @ts-ignore
    query = query[method](f.field, f.op === 'in' ? `(${f.value})` : f.value)
  }

  for (const s of q.sort) {
    const desc = s.startsWith('-')
    const col = desc ? s.slice(1) : s
    query = query.order(col, { ascending: !desc, nullsFirst: false })
  }

  if (q.sort.length === 0 && res.defaultOrder) {
    query = query.order(res.defaultOrder.column, { ascending: !res.defaultOrder.desc })
  }

  query = query.range(q.offset, q.offset + q.limit - 1)
  const { data, error, count } = await query
  if (error) throw new Response(error.message, { status: 400 })
  return { data, meta: { count, limit: q.limit, offset: q.offset } }
}

export async function getRecord(
  svc: ReturnType<typeof createClient>,
  res: ResourceDefinition,
  tenantId: string,
  id: string,
  fields: string[],
  include: string[]
) {
  const select = buildSelect(res.selectable, fields, res.relations, include)
  const { data, error } = await svc.from(res.table).select(select).eq(res.key, id).eq('tenant_id', tenantId).single()
  if (error) throw new Response(error.message, { status: 404 })
  return data
}

export async function createRecord(
  svc: ReturnType<typeof createClient>,
  res: ResourceDefinition,
  tenantId: string,
  body: unknown
) {
  if (!res.createSchema) throw new Response('Forbidden', { status: 403 })
  const parsed = res.createSchema.parse(body)
  const { data, error } = await svc.from(res.table).insert([{ ...parsed, tenant_id: tenantId }]).select().single()
  if (error) throw new Response(error.message, { status: 400 })
  return data
}

export async function updateRecord(
  svc: ReturnType<typeof createClient>,
  res: ResourceDefinition,
  tenantId: string,
  id: string,
  body: unknown
) {
  if (!res.updateSchema) throw new Response('Forbidden', { status: 403 })
  const parsed = res.updateSchema.parse(body)
  const { data, error } = await svc.from(res.table).update(parsed).eq(res.key, id).eq('tenant_id', tenantId).select().single()
  if (error) throw new Response(error.message, { status: 400 })
  return data
}

export async function deleteRecord(
  svc: ReturnType<typeof createClient>,
  res: ResourceDefinition,
  tenantId: string,
  id: string
) {
  const { error } = await svc.from(res.table).delete().eq(res.key, id).eq('tenant_id', tenantId)
  if (error) throw new Response(error.message, { status: 400 })
}
