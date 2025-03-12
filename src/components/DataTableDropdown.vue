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
import { useToast } from './ui/toast'
import axios from 'axios'

const { toast } = useToast()
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

const removeUser = async (id: string) => {
  try {
    await axios.delete(`https://fakestoreapi.com/users/${id}`)

    toast({
      title: 'User deleted',
      description: `User ${id} has been deleted`,
      class: 'bg-green-500',
      duration: 3000,
    })
  } catch (error) {
    toast({
      title: 'Error deleting',
      description: `Item ${id} can't be deleted`,
      variant: 'destructive',
      duration: 3000,
    })
  }
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
      <DropdownMenuItem @click="removeUser(userId.toString())">Delete User</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
