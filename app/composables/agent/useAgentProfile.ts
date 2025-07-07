// useAgentProfile.ts
import type { agent_profile_view } from '~/types/database.types'

export const useAgentProfile = (agentId: string) => {
  const supabase = useSupabaseClient()
  const toast = useToast() // Для показа уведомлений (если используете Nuxt UI)

  // Основная функция загрузки профиля
  const loadAgentProfile = async () => {
    console.log(`[AgentProfile] Загрузка данных для agent_id: ${agentId}`)

    try {
      const { data, error, status } = await supabase
        .from('agent_profile_view')
        .select('*')
        .eq('agent_id', agentId)
        .maybeSingle() // Используем maybeSingle вместо single

      console.group('[AgentProfile] Результат запроса:')
      console.log('Статус:', status)
      console.log('Данные:', data)
      console.log('Ошибка:', error)
      console.groupEnd()

      if (error) {
        console.error('[AgentProfile] Ошибка при загрузке:', error)
        toast.add({
          title: 'Ошибка загрузки профиля',
          description: error.message,
          color: 'red'
        })
        throw error
      }

      if (!data) {
        console.warn('[AgentProfile] Профиль не найден')
        toast.add({
          title: 'Профиль не найден',
          description: `Агент с ID ${agentId} не существует`,
          color: 'orange'
        })
        return null
      }

      console.log('[AgentProfile] Данные успешно загружены')
      return data as agent_profile_view['Row']
    } catch (err) {
      console.error('[AgentProfile] Критическая ошибка:', err)
      throw err
    }
  }

  // Используем useAsyncData для SSR-поддержки
  const { data: profile, refresh, pending, error } = useAsyncData(
    `agent-profile-${agentId}`,
    loadAgentProfile
  )

  // Функция обновления профиля
  const updateProfile = async (updates: Partial<{
    full_name?: string | null
    phone?: string | null
    user_pict?: string | null
    airline_id?: string | null
    role_id?: string | null
  }>) => {
    if (!profile.value?.user_id) {
      const errMsg = 'Нельзя обновить профиль: user_id отсутствует'
      console.error('[AgentProfile]', errMsg)
      throw new Error(errMsg)
    }

    console.log('[AgentProfile] Обновление профиля:', updates)

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', profile.value.user_id)
        .select()
        .single()

      if (error) throw error

      console.log('[AgentProfile] Профиль успешно обновлен')
      await refresh() // Обновляем данные после изменения
      return data
    } catch (err) {
      console.error('[AgentProfile] Ошибка обновления:', err)
      toast.add({
        title: 'Ошибка обновления',
        description: err.message,
        color: 'red'
      })
      throw err
    }
  }

  // Подписка на изменения профиля
  const setupRealtimeUpdates = () => {
    if (!profile.value?.user_id) return

    const channel = supabase.channel(`agent-${agentId}-changes`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${profile.value.user_id}`
        },
        () => {
          console.log('[AgentProfile] Получено обновление профиля')
          refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  onMounted(setupRealtimeUpdates)
  watch(profile, setupRealtimeUpdates)

  return {
    profile,
    refresh,
    updateProfile,
    isLoading: pending,
    error
  }
}