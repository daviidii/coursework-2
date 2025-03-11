<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import FormField from './FormField.vue'
import FormTextarea from '@/components/FormTextArea.vue'
import FormSelect from './FormSelect.vue'
import type { ProductItemProps } from '@/types/ProductItemProps'

const props = defineProps<{
  initialData?: ProductItemProps
  isSubmitting?: boolean
  submitButtonText?: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: ProductItemProps): void
}>()

// Form validation rules
const titleRules = { required: true, minLength: 3, maxLength: 100 }
const priceRules = { required: true, min: 0 }
const descriptionRules = { required: true, minLength: 10 }
const categoryRules = { required: true }
const imageRules = { required: true, pattern: /^https?:\/\/.+/ }
const ratingRateRules = { required: true, min: 0, max: 5 }
const ratingCountRules = { required: true, min: 0 }

// Category options
const categoryOptions = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelery' },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: "women's clothing", label: "Women's Clothing" },
]

// Initialize form with default values or provided initial data
const form = reactive({
  id: props.initialData?.id,
  title: props.initialData?.title || '',
  price: props.initialData?.price || 0,
  description: props.initialData?.description || '',
  category: props.initialData?.category || '',
  image: props.initialData?.image || '',
  rating: reactive({
    count: props.initialData?.rating?.count || 0,
    rate: props.initialData?.rating?.rate || 0,
  }),
})

// Create computed properties for nested rating values to ensure proper reactivity
const ratingRate = computed({
  get: () => form.rating.rate,
  set: (value) => {
    form.rating.rate = value
  },
})

const ratingCount = computed({
  get: () => form.rating.count,
  set: (value) => {
    form.rating.count = value
  },
})

// Derived properties
const submitButtonText = computed(
  () => props.submitButtonText || (form.id ? 'Update Product' : 'Create Product'),
)

// Form handlers
function handleSubmit() {
  const productData: ProductItemProps = {
    id: form.id || Math.floor(Math.random() * 1000), // Generate ID if not provided
    title: form.title,
    price: Number(form.price),
    description: form.description,
    category: form.category,
    image: form.image,
    rating: {
      count: Number(form.rating.count),
      rate: Number(form.rating.rate),
    },
  }

  emit('submit', productData)
}

function resetForm() {
  if (props.initialData) {
    // Reset to initial data
    Object.assign(form, {
      ...props.initialData,
      rating: { ...props.initialData.rating },
    })
  } else {
    // Reset to empty form
    Object.assign(form, {
      id: undefined,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        count: 0,
        rate: 0,
      },
    })
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Product Title -->
        <FormField
          v-model="form.title"
          name="title"
          label="Product Title"
          type="text"
          :validation="titleRules"
        />

        <!-- Product Price -->
        <FormField
          v-model="form.price"
          name="price"
          label="Price"
          type="number"
          step="5"
          :validation="priceRules"
        />
      </div>

      <!-- Product Category -->
      <FormSelect
        v-model="form.category"
        name="category"
        label="Category"
        :options="categoryOptions"
        :validation="categoryRules"
      />

      <!-- Product Description -->
      <FormTextarea
        v-model="form.description"
        name="description"
        label="Description"
        :validation="descriptionRules"
      />

      <!-- Product Image URL -->
      <FormField v-model="form.image" name="image" label="Image URL" :validation="imageRules" />

      <!-- Rating Group -->
      <div class="space-y-2">
        <Label>Rating Information</Label>
        <Card class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              v-model="ratingRate"
              name="rating.rate"
              label="Rating (0-5)"
              type="number"
              step="0.5"
              min="0"
              max="5"
              :validation="ratingRateRules"
            />
            <FormField
              v-model="ratingCount"
              name="rating.count"
              label="Rating Count"
              type="number"
              :validation="ratingCountRules"
            />
          </div>
        </Card>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" variant="outline" @click="resetForm">Reset</Button>
      <Button type="submit" :disabled="isSubmitting">
        {{ submitButtonText }}
      </Button>
    </div>
  </form>
</template>
