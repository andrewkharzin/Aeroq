<script setup lang="ts">
import { useAgentProfile } from '~/composables/agent/useAgentProfile'
import CardStats from '~/components/dashboard/CardStats.vue'
import RecentActivity from '~/components/dashboard/RecentActivity.vue'
import ProjectOverview from '~/components/dashboard/ProjectOverview.vue'
import PerformanceChart from '~/components/dashboard/PerformanceChart.vue'
// definePageMeta({
//   middleware: ['agent-auth']
// })
definePageMeta({
  layout: 'home',
  // middleware: ['anon'] // Используем middleware для анонимных пользователей
})

const route = useRoute()
const agentId = ref(route.params.agent_id as string)
const supabase = useSupabaseClient()

// Use the composable instead of direct Supabase calls
const { profile, refresh } = useAgentProfile(agentId.value)

// Subscription to profile changes
let subscription: any = null

watch(profile, (newProfile) => {
  // Clean up existing subscription if any
  if (subscription) {
    supabase.removeChannel(subscription)
    subscription = null
  }

  // Create new subscription if we have a user_id
  if (newProfile?.user_id) {
    subscription = supabase.channel(`agent-${agentId.value}-changes`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.${newProfile.user_id}`
        },
        () => refresh()
      )
      .subscribe()
  }
}, { immediate: true })

onUnmounted(() => {
  if (subscription) {
    supabase.removeChannel(subscription)
  }
})
</script>

<template>
  <UContainer class="py-8">
    <!-- Header and general info -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <UAvatar
              :src="profile?.user_pict"
              :alt="profile?.full_name"
              size="lg"
            />
            <div>
              <h1 class="text-2xl font-bold">
                {{ profile?.full_name }}
              </h1>
              <p class="text-gray-500">
                {{ profile?.role_name }}
                <span v-if="profile?.airline_name">• {{ profile?.airline_name }}</span>
              </p>
            </div>
          </div>
          <UBadge color="primary" variant="solid">
            Agent ID: {{ profile?.agent_code }}
          </UBadge>
        </div>
      </template>

      <!-- Premium KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <CardStats title="Total AWBs" :value="profile?.total_awbs || 0" change="+12%" icon="i-lucide-package" />
        <CardStats title="Active AWBs" :value="profile?.active_awbs || 0" change="+4%" icon="i-lucide-ship" />
        <CardStats title="On-time Rate" :value="'96%'" change="+2%" icon="i-lucide-clock" />
        <CardStats title="Revenue" :value="'€42,580'" change="-1.2%" icon="i-lucide-euro" />
      </div>

      <!-- Dashboard navigation -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UButton
          :to="`/agent/${agentId}/awbs/list`"
          icon="i-heroicons-document-text"
          variant="ghost"
        >
          My AWB List
        </UButton>
        <UButton
          :to="`/agent/${agentId}/awb/new`"
          icon="i-heroicons-plus-circle"
          variant="ghost"
        >
          Create AWB
        </UButton>
        <UButton
          :to="`/agent/${agentId}/settings`"
          icon="i-heroicons-cog-6-tooth"
          variant="ghost"
        >
          Settings
        </UButton>
        <UButton
          :to="`/agent/${agentId}/reports`"
          icon="i-heroicons-chart-bar"
          variant="ghost"
        >
          Reports
        </UButton>
      </div>
    </UCard>

    <!-- Premium content blocks -->
    <div class="grid gap-6 lg:grid-cols-3 mt-6">
      <div class="lg:col-span-2">
        <PerformanceChart />
      </div>
      <div class="space-y-6">
        <RecentActivity />
        <ProjectOverview />
      </div>
    </div>

    <!-- Recent AWBs (additional component) -->
    <AgentRecentAwbList :agent-id="agentId" class="mt-6" />
  </UContainer>
</template>