<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { UserProps } from '@/types/UserProps'
import { toast } from '@/components/ui/toast'
import UsersForm from '@/components/UsersForm.vue'

const route = useRoute()
const mode = route.params.mode
const userId = route.params.userId

const isEditing = mode === 'update' && userId
const loading = ref<boolean>(false)

const user = ref<UserProps | undefined>(undefined)

async function handleSubmit(formData: UserProps) {
  loading.value = true

  try {
    if (isEditing) {
      await axios.put(`https://fakestoreapi.com/users/${userId}`, formData)

      toast({
        title: 'User updated ',
        description: `User ${userId} has been updated`,
        class: 'bg-green-500',
        duration: 3000,
      })
    } else {
      await axios.post('https://fakestoreapi.com/users', formData)

      toast({
        title: 'User added',
        description: `${user.value?.username} has been added`,
        class: 'bg-green-500',
        duration: 3000,
      })
    }
  } catch (error) {
    console.error('Error saving product:', error)
    toast({
      title: 'error',
      description: `Error saving`,
      variant: 'destructive',
      duration: 3000,
    })
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (isEditing) {
    try {
      const res = await axios.get(`https://fakestoreapi.com/users/${userId}`)

      user.value = res.data

      console.log(res.data)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }
})
</script>
<template>
  <PageWrapper>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">{{ user ? 'Edit Product' : 'Add New Product' }}</h1>

      <UsersForm
        v-if="!isEditing || user"
        :initial-data="user"
        :is-submitting="loading"
        @submit="handleSubmit"
      />
    </div>
  </PageWrapper>
</template>
