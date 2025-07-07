import type { Database } from '~/types/database.types'

export const useAgentAwb = () => {
  const supabase = useSupabaseClient<Database>()

  const fetchAwbs = async (params?: {
    page?: number
    perPage?: number
    search?: string
    status?: string
  }) => {
    console.log('[useAgentAwb] Starting fetchAwbs with params:', params)

    const { page = 1, perPage = 20, search, status } = params || {}

    try {
      let query = supabase
        .from('agent_air_waybills')
        .select('*', { count: 'exact' })
        .range((page - 1) * perPage, page * perPage - 1)
        .order('created_at', { ascending: false })

      console.log('[useAgentAwb] Base query constructed')

      if (search) {
        console.log('[useAgentAwb] Adding search filter:', search)
        query = query.or(
          `awb_number.ilike.%${search}%,full_awb_number.ilike.%${search}%,shipper_name.ilike.%${search}%`
        )
      }

      if (status) {
        console.log('[useAgentAwb] Adding status filter:', status)
        query = query.eq('status', status)
      }

      console.log('[useAgentAwb] Executing query...')
      const { data, error, count } = await query

      if (error) {
        console.error('[useAgentAwb] Query error:', error)
        throw error
      }

      console.log('[useAgentAwb] Query successful. Data count:', data?.length)
      console.debug('[useAgentAwb] First item:', data?.[0])

      return {
        data: data as Database['public']['Views']['agent_air_waybills']['Row'][],
        count: count || 0
      }
    } catch (error) {
      console.error('[useAgentAwb] Error in fetchAwbs:', error)
      throw error
    }
  }

  const getAwbDetails = async (id: string) => {
    console.log('[useAgentAwb] Fetching AWB details for ID:', id)

    try {
      const { data, error } = await supabase
        .from('agent_air_waybills')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('[useAgentAwb] Error fetching AWB details:', error)
        throw error
      }

      console.log('[useAgentAwb] Successfully fetched AWB details')
      console.debug('[useAgentAwb] AWB data:', data)

      return data as Database['public']['Views']['agent_air_waybills']['Row']
    } catch (error) {
      console.error('[useAgentAwb] Error in getAwbDetails:', error)
      throw error
    }
  }

  return {
    fetchAwbs,
    getAwbDetails
  }
}
