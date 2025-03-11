<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import type { UserProps } from '@/types/UserProps'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const users = ref<UserProps>()

onMounted(async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/users')

    users.value = res.data
  } catch (error) {
    console.error('error fetching users', error)
  }
})
</script>
<template>
  <PageWrapper>View alll Users</PageWrapper>
</template>
