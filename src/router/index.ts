import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AddProduct from '@/pages/ManageProduct.vue'
import AddUser from '@/pages/AddUser.vue'
import Home from '@/pages/Home.vue'
import ViewAllProducts from '@/pages/ViewAllProducts.vue'
import ViewAllUsers from '@/pages/ViewAllUsers.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: DefaultLayout, // 🟢 Layout wraps child routes
    children: [
      { path: '', component: Home },
      { path: 'products/view-all', component: ViewAllProducts },
      { path: 'users/view-all', component: ViewAllUsers },
      { path: 'product/:mode/:productId?', component: AddProduct },
      { path: 'user/:mode/:userId?', component: AddUser },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
