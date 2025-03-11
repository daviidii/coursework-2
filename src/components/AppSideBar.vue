<script setup lang="ts">
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import SidebarHeaderSwitcher from './SidebarHeaderSwitcher.vue'

import { ShoppingBasket, User } from 'lucide-vue-next'
import type { SidebarProp } from '@/types/SidebarProps'
import SidebarNavMain from './SidebarNavMain.vue'
import SidebarFooterUser from './SidebarFooterUser.vue'
import type { SidebarUserProp } from '@/types/SidebarUserProp'

const SidebarData: SidebarProp[] = [
  {
    title: 'Products',
    icon: ShoppingBasket,
    url: '#',
    isActive: true,
    subItems: [
      { title: 'Add Product', url: '/product/add' },
      { title: 'View All Products', url: '/products/view-all' },
    ],
  },
  {
    title: 'Users',
    icon: User,
    url: '#',
    isActive: false,
    subItems: [
      { title: 'Add User', url: '/user/add' },
      { title: 'View All Users', url: '/users/view-all' },
    ],
  },
]

const sidebarUser: SidebarUserProp = {
  name: 'David Duran',
  email: 'david.duran@commerce.com',
  avatar: '/avatars/shadcn.jpg',
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarHeaderSwitcher />
    </SidebarHeader>
    <SidebarContent>
      <SidebarNavMain :items="SidebarData" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarFooterUser :user="sidebarUser" />
    </SidebarFooter>
  </Sidebar>
</template>
