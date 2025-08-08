// supabase/functions/api/core/auth.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

export function supabaseForRequest(req: Request) {
  const authHeader = req.headers.get('Authorization') ?? ''
  const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: authHeader } }
  })
  const svcClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
  return { userClient, svcClient }
}

export async function getAuthContext(req: Request) {
  const { userClient } = supabaseForRequest(req)
  const { data, error } = await userClient.auth.getUser()
  if (error || !data?.user) throw new Response('Unauthorized', { status: 401 })
  const tenantId = (data.user.app_metadata?.tenant_id as string | undefined) ?? 'default'
  const roles = (data.user.app_metadata?.roles as string[] | undefined) ?? []
  return { userId: data.user.id, tenantId, roles }
}
