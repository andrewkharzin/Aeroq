<script setup lang="ts">
type Project = {
  id: string
  name: string
  progress: number
  status: 'on-track' | 'at-risk' | 'delayed'
}

const projects = ref<Project[]>([
  { id: 'p1', name: 'Global Freight Revamp', progress: 76, status: 'on-track' },
  { id: 'p2', name: 'Customs Automation', progress: 42, status: 'at-risk' },
  { id: 'p3', name: 'Partner Portal', progress: 91, status: 'on-track' },
  { id: 'p4', name: 'Carrier Integration', progress: 28, status: 'delayed' }
])

function statusColor(status: Project['status']) {
  return {
    'on-track': 'success',
    'at-risk': 'warning',
    'delayed': 'error'
  }[status]
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-base font-semibold">Project Overview</h3>
    </template>

    <div class="space-y-4">
      <div v-for="p in projects" :key="p.id">
        <div class="flex items-center justify-between mb-1">
          <p class="text-sm font-medium text-highlighted">{{ p.name }}</p>
          <div class="flex items-center gap-2">
            <UBadge :color="(statusColor(p.status) as any)" variant="subtle" class="capitalize">{{ p.status.replace('-', ' ') }}</UBadge>
            <span class="text-sm text-muted">{{ p.progress }}%</span>
          </div>
        </div>
        <UProgress :model-value="p.progress" size="lg" :color="(statusColor(p.status) as any)" />
      </div>
    </div>
  </UCard>
</template>

