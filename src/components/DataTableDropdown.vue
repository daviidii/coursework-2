<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  userId: number
}>()

const copy = (id: string) => {
  navigator.clipboard.writeText(id)
}

const goToUserUpdate = (id: string) => {
  router.push(`/user/update/${id}`)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(userId.toString())"> Copy user ID </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="goToUserUpdate(userId.toString())">Update User</DropdownMenuItem>
      <DropdownMenuItem>Delete User</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
