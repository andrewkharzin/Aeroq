export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const PUBLIC_ROUTES = ['/login', '/register', '/auth/confirm']

  if (PUBLIC_ROUTES.includes(to.path)) return

  if (!user.value) {
    return navigateTo('/login')
  }

  try {
    // Get user's role (using maybeSingle to handle empty results)
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role_id, roles:role_id (name)')
      .eq('user_id', user.value.id)
      .maybeSingle()

    if (profileError) throw profileError

    // Handle airline agent redirect
    if (profile?.roles?.name === 'airline_agent') {
      const { data: agent, error: agentError } = await supabase
        .from('agents')
        .select('id')
        .eq('profile_id', user.value.id)
        .maybeSingle()

      if (agentError) throw agentError
      if (agent?.id && !to.path.startsWith(`/agent/${agent.id}`)) {
        return navigateTo(`/agent/${agent.id}/dashboard`)
      }
    }

    // Block non-agents from agent routes
    if (profile?.roles?.name !== 'airline_agent' && to.path.startsWith('/agent')) {
      return navigateTo('/')
    }

  } catch (error) {
    console.error('Auth error:', error)
    if (to.path.startsWith('/agent')) {
      return navigateTo('/')
    }
  }
})