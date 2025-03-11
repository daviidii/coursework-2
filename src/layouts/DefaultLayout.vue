<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Toaster from '@/components/ui/toast/Toaster.vue'

import AppSideBar from '@/components/AppSideBar.vue'
</script>

<template>
  <SidebarProvider>
    <AppSideBar />
    <main class="w-full">
      <SidebarTrigger />
      <RouterView />
    </main>
    <Toaster />
  </SidebarProvider>
</template>
