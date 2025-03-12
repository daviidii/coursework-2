import type { UserProps } from '@/types/UserProps'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import DropdownAction from '../components/DataTableDropdown.vue'
import { ArrowUpDown } from 'lucide-vue-next'

import { h } from 'vue'

export const columns: ColumnDef<UserProps>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      const fname = row.original.name.firstname
      const lname = row.original.name.lastname

      return h('div', { class: 'text-left' }, `${fname} ${lname}`)
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'text-left' }, 'Phone'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.original.phone)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const userId = row.original.id

      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          userId,
        }),
      )
    },
  },
]
