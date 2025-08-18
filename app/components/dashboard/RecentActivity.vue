<script setup lang="ts">
type Activity = {
  id: string
  title: string
  description: string
  time: string
  icon?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
}

const activities = ref<Activity[]>([
  { id: '1', title: 'AWB Created', description: 'AWB 123-4567890 created for ACME Inc.', time: '2h ago', icon: 'i-lucide-clipboard-list', color: 'primary' },
  { id: '2', title: 'Status Updated', description: 'AWB 123-4567890 marked In-Transit', time: '4h ago', icon: 'i-lucide-ship', color: 'success' },
  { id: '3', title: 'Payment Received', description: 'Invoice INV-00988 paid', time: '1d ago', icon: 'i-lucide-badge-check', color: 'success' },
  { id: '4', title: 'Shipment Delayed', description: 'AWB 123-4567890 delayed due to weather', time: '2d ago', icon: 'i-lucide-alert-triangle', color: 'warning' }
])
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold">Recent Activity</h3>
        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-refresh-ccw" />
      </div>
    </template>

    <ul class="space-y-4">
      <li v-for="item in activities" :key="item.id" class="flex items-start gap-3">
        <UBadge :color="item.color || 'neutral'" variant="soft" class="shrink-0">
          <UIcon :name="item.icon || 'i-lucide-circle'" />
        </UBadge>
        <div class="min-w-0">
          <p class="text-sm font-medium text-highlighted">{{ item.title }}</p>
          <p class="text-sm text-muted truncate">{{ item.description }}</p>
        </div>
        <span class="ml-auto shrink-0 text-xs text-muted">{{ item.time }}</span>
      </li>
    </ul>
  </UCard>
</template>

