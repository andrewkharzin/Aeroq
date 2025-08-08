// supabase/functions/api/core/query.ts
import type { ParsedQuery } from './types.ts'

const ops = new Map([
  ['eq', 'eq'], ['ne', 'neq'], ['lt', 'lt'], ['lte', 'lte'],
  ['gt', 'gt'], ['gte', 'gte'], ['ilike', 'ilike'], ['like', 'like'], ['in', 'in']
])

export function parseQuery(url: URL): ParsedQuery {
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200)
  const offset = Math.max(parseInt(url.searchParams.get('offset') ?? '0', 10), 0)
  const sort = (url.searchParams.get('sort') ?? '').split(',').filter(Boolean)
  const fields = (url.searchParams.get('fields') ?? '').split(',').filter(Boolean)
  const include = (url.searchParams.get('include') ?? '').split(',').filter(Boolean)
  const filters: ParsedQuery['filters'] = []
  for (const [k, v] of url.searchParams.entries()) {
    const m = k.match(/^filter\[(.+)\]$/)
    if (!m) continue
    const [op, ...rest] = v.split(':')
    const value = rest.join(':')
    if (ops.has(op)) filters.push({ field: m[1], op, value })
  }
  return { limit, offset, sort, fields, include, filters }
}

export function buildSelect(selectable?: string[], fields?: string[], relations?: string[], include?: string[]) {
  const base = fields && fields.length ? fields.join(',') : (selectable?.join(',') ?? '*')
  const rel = (include ?? [])
    .filter(r => relations?.includes(r))
    .map(r => `${r}(*)`)
  return rel.length ? `${base},${rel.join(',')}` : base
}

export { ops }
