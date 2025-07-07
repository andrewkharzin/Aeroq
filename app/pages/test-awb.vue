<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Air Waybills Test</h1>

    <!-- Простой вывод данных без таблицы -->
    <div v-if="awbs.length" class="space-y-2">
      <div v-for="awb in awbs" :key="awb.id" class="border p-2">
        <p><strong>AWB:</strong> {{ awb.full_awb_number }}</p>
        <p><strong>Shipper:</strong> {{ awb.shipper_name }}</p>
        <p><strong>Status:</strong> {{ awb.status }}</p>
      </div>
    </div>

    <div v-else class="text-red-500">
      No data loaded. Check console for details.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAgentAwb } from '~/composables/agent/useAgentAwb'

console.log('Starting page setup...')

const { fetchAwbs } = useAgentAwb()
const awbs = ref([])

onMounted(async () => {
  console.log('Page mounted, fetching data...')

  try {
    const result = await fetchAwbs()
    console.log('Data received:', result)

    if (result.data) {
      awbs.value = result.data
      console.log('awbs set:', awbs.value)
    } else {
      console.warn('No data in response')
    }
  } catch (error) {
    console.error('Fetch error:', error)
  }
})
</script>