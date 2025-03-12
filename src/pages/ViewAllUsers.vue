<script setup lang="ts">
import DataTable from '@/components/DataTable.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import type { UserProps } from '@/types/UserProps'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { columns } from '@/components/columns'

const users = ref<UserProps[]>([])

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
  <PageWrapper>
    <DataTable v-if="users.length" :columns="columns" :data="users" />
  </PageWrapper>
</template>
