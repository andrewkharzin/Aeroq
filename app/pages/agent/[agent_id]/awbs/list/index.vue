<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import type { Database } from '~/types/database.types'
import { useAgentAwb } from '~/composables/agent/useAgentAwb'

const NuxtLink = resolveComponent('NuxtLink')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

type AirWaybill = Database['public']['Views']['agent_air_waybills']['Row']

const { data: awbs, pending } = await useAsyncData('air-waybills', async () => {
  const { fetchAwbs } = useAgentAwb()
  const result = await fetchAwbs()
  return result.data as AirWaybill[]
})

const columns: TableColumn<AirWaybill>[] = [
  {
    accessorKey: 'awb_number',
    header: ({ column }) => getHeader(column, 'AWB'),
    cell: ({ row }) => h(NuxtLink, {
      to: `/awb/${row.original.id}`,
      class: 'font-mono text-primary hover:underline'
    }, row.getValue('awb_number'))
  },
  {
    accessorKey: 'shipper_name',
    header: ({ column }) => getHeader(column, 'Shipper'),
    cell: ({ row }) => row.getValue('shipper_name') || '-'
  },
  {
    accessorKey: 'origin',
    header: ({ column }) => getHeader(column, 'Origin'),
    cell: ({ row }) => h('span', { class: 'font-mono uppercase' }, row.getValue('origin'))
  },
  {
    accessorKey: 'destination',
    header: ({ column }) => getHeader(column, 'Destination'),
    cell: ({ row }) => h('span', { class: 'font-mono uppercase' }, row.getValue('destination'))
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getHeader(column, 'Fill Step'),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const color = {
        'draft': 'gray',
        'issued': 'blue',
        'in-transit': 'orange',
        'delivered': 'green',
        'cancelled': 'red'
      }[status] || 'gray'

      return h(UBadge, {
        variant: 'subtle',
        color,
        class: 'capitalize'
      }, status)
    }
  },
  {
    accessorKey: 'status_code',
    header: 'Booking Status',
    cell: ({ row }) => {
      const color = {
        KK: 'success' as const, // green
        XX: 'error' as const // red
      }[row.original.status_code] || 'warning' as const // orange для остальных случаев

      return h(UBadge, {
        class: 'capitalize',
        variant: 'subtle',
        color
      }, row.original.status_code || '-')
    }
  },
  {
    accessorKey: 'gross_weight',
    header: ({ column }) => h('div', { class: 'text-right' }, getHeader(column, 'Weight')),
    cell: ({ row }) => {
      const weight = row.getValue('gross_weight')
      const unit = row.original.weight_unit
      return h('div', { class: 'text-right font-mono' },
        weight ? `${weight} ${unit}` : '-'
      )
    }
  }
]

function getHeader(column: Column<AirWaybill>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      content: {
        align: 'start'
      },
      items: [
        {
          label: 'Asc',
          type: 'checkbox',
          icon: 'i-heroicons-arrow-up',
          checked: isSorted === 'asc',
          onSelect: () => isSorted === 'asc' ? column.clearSorting() : column.toggleSorting(false)
        },
        {
          label: 'Desc',
          icon: 'i-heroicons-arrow-down',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => isSorted === 'desc' ? column.clearSorting() : column.toggleSorting(true)
        }
      ]
    },
    () =>
      h(UButton, {
        color: 'gray',
        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-arrow-up'
            : 'i-heroicons-arrow-down'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5 data-[state=open]:bg-gray-100'
      })
  )
}

const sorting = ref([{ id: 'created_at', desc: true }])
</script>

<template>
  <UDashboardPanel id="shipments">
    <template #header>
      <UDashboardNavbar title="Shipments">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <CustomersAddModal />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UTable
          v-model:sorting="sorting"
          :columns="columns"
          :data="awbs || []"
          :loading="pending"
          class="shrink-0"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
            td: 'border-b border-default'
          }"
        >
          <template #empty-state>
            <div class="py-8 text-center text-gray-500">
              No air waybills found
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UDashboardPanel>
</template>
