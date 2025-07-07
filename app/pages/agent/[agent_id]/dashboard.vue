<script setup lang="ts">
import { useAgentProfile } from '~/composables/agent/useAgentProfile'
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

      <!-- Main metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">
              Total AWB
            </h3>
          </template>
          <p class="text-3xl font-bold">
            {{ profile?.total_awbs || 0 }}
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              Active AWB
            </h3>
          </template>
          <p class="text-3xl font-bold text-green-500">
            {{ profile?.active_awbs || 0 }}
          </p>
        </UCard>

        <UCard>
          <template #header>
            <h3 class="font-semibold">
              Last 30 Days
            </h3>
          </template>
          <p class="text-3xl font-bold">
            {{ profile?.recent_awbs || 0 }}
          </p>
        </UCard>
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

    <!-- Recent AWBs (additional component) -->
    <AgentRecentAwbList :agent-id="agentId" class="mt-6" />
  </UContainer>
</template>