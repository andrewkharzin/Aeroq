export default defineNuxtRouteMiddleware(async (to) => {
  const agentId = to.params.agent_id as string;
  const supabase = useSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Проверяем, что текущий пользователь имеет доступ к этому агенту
  const { data: profile, error } = await supabase
    .from('agent_profile_view')
    .select('user_id, role_name')
    .eq('agent_id', agentId)
    .single();

  if (error || !profile || (profile.user_id !== user?.id && profile.role_name !== 'admin')) {
    return navigateTo('/auth/error?message=access_denied');
  }
});