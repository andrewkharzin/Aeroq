<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  change?: string
  icon?: string
}>()

const isNegative = computed(() => (props.change || '').trim().startsWith('-'))
</script>

<template>
  <UCard>
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-muted">{{ title }}</p>
        <p class="mt-1 text-3xl font-bold">{{ value }}</p>
        <div v-if="change" class="mt-2">
          <UBadge :color="isNegative ? 'error' : 'success'" variant="subtle">
            {{ change }} from last period
          </UBadge>
        </div>
      </div>
      <div class="shrink-0 rounded-lg bg-elevated/60 p-2">
        <UIcon v-if="icon" :name="icon" class="h-5 w-5 text-muted" />
      </div>
    </div>
  </UCard>
  
</template>

