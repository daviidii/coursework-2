<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import ProductCard from '@/components/ProductCard.vue'
import type { ProductItemProps } from '@/types/ProductItemProps'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'

import { useToast } from '@/components/ui/toast/use-toast'
import { useRouter } from 'vue-router'

const { toast } = useToast()
const router = useRouter()
const products = ref<ProductItemProps[]>([])

const state = reactive<{ isDeleting: boolean; isFetching: boolean }>({
  isDeleting: false,
  isFetching: true,
})

const removeProduct = async (productId: number) => {
  state.isDeleting = true
  try {
    await axios.delete(`https://fakestoreapi.com/products/${productId}`)

    products.value = products.value.filter((product) => product.id !== productId)
    toast({
      title: 'Item deleted',
      description: `Item ${productId} has been deleted`,
      class: 'bg-green-500',
      duration: 3000,
    })
  } catch (error) {
    console.error('error deleting product', error)
    toast({
      title: 'Error deleting',
      description: `Item ${productId} can't be deleted`,
      variant: 'destructive',
      duration: 3000,
    })
  } finally {
    state.isDeleting = false
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/products')

    products.value = res.data
  } catch (error) {
    console.error('error fetching products', error)
  } finally {
    state.isFetching = false
  }
})
</script>
<template>
  <PageWrapper>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <ProductCard
        v-for="(product, idx) in products"
        :key="product.id"
        :item="product"
        :is-deleting="state.isDeleting"
        @on-update="() => router.push(`/product/update/${product.id}`)"
        @on-delete="removeProduct(product.id)"
      />
    </div>
  </PageWrapper>
</template>
