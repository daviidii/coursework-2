<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import { onMounted, ref } from 'vue'
import ProductForm from '@/components/ProductForm.vue'
import type { ProductItemProps } from '@/types/ProductItemProps'
import { useRoute } from 'vue-router'
import axios from 'axios'

import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const route = useRoute()
const mode = route.params.mode
const productId = route.params.productId

const isEditing = mode === 'update' && productId
// Sample product data (for edit mode)
const product = ref<ProductItemProps | undefined>(undefined)

const loading = ref(false)

async function handleSubmit(formData: ProductItemProps) {
  loading.value = true

  try {
    if (isEditing) {
      await axios.put(`https://fakestoreapi.com/products/${productId}`, formData)

      toast({
        title: 'Item updated',
        description: `Item ${productId} has been updated`,
        class: 'bg-green-500',
        duration: 3000,
      })
    } else {
      await axios.post('https://fakestoreapi.com/products', formData)

      toast({
        title: 'Item added',
        description: `${formData.title} has been added`,
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
      const res = await axios.get(`https://fakestoreapi.com/products/${productId}`)

      product.value = res.data

      console.log(product.value)
    } catch (error) {
      console.error(`error fetching product ${productId}`, error)
    }
  }
})
</script>
<template>
  <PageWrapper>
    <div class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">{{ product ? 'Edit Product' : 'Add New Product' }}</h1>

      <ProductForm
        v-if="!isEditing || product"
        :initial-data="product"
        :is-submitting="loading"
        @submit="handleSubmit"
      />
    </div>
  </PageWrapper>
</template>
