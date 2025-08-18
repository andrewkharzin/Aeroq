<script setup lang="ts">
type Point = { label: string, value: number }

const period = ref<'7d' | '30d' | '90d'>('30d')

const series = computed<Point[]>(() => {
  const size = period.value === '7d' ? 7 : period.value === '30d' ? 30 : 12
  return Array.from({ length: size }).map((_, i) => ({
    label: period.value === '90d' ? `M${i + 1}` : `D${i + 1}`,
    value: Math.round(50 + Math.random() * 100)
  }))
})

const total = computed(() => series.value.reduce((a, b) => a + b.value, 0))
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-base font-semibold">Performance</h3>
          <p class="text-sm text-muted">Conversion over time</p>
        </div>
        <USelect v-model="period" :items="[
          { label: '7 days', value: '7d' },
          { label: '30 days', value: '30d' },
          { label: '12 months', value: '90d' }
        ]" size="sm" />
      </div>
    </template>

    <div class="space-y-6">
      <div class="grid gap-3 sm:grid-cols-3">
        <UCard variant="subtle"><p class="text-sm text-muted">Total</p><p class="mt-1 text-2xl font-semibold">{{ total }}</p></UCard>
        <UCard variant="subtle"><p class="text-sm text-muted">Avg</p><p class="mt-1 text-2xl font-semibold">{{ Math.round(total / series.length) }}</p></UCard>
        <UCard variant="subtle"><p class="text-sm text-muted">Peak</p><p class="mt-1 text-2xl font-semibold">{{ Math.max(...series.map(p => p.value)) }}</p></UCard>
      </div>

      <div class="grid grid-cols-12 items-end gap-2 h-40">
        <div v-for="point in series" :key="point.label" class="flex flex-col items-center gap-1">
          <div class="w-full bg-primary/20 rounded-sm" :style="{ height: `${Math.max(6, point.value)}px` }"></div>
          <span class="text-[10px] text-muted">{{ point.label }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>

