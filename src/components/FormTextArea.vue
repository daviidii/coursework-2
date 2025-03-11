<template>
  <div class="space-y-2">
    <Label :for="name">{{ label }}</Label>
    <Textarea
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      :class="{ 'border-red-500': errorMessage }"
      :rows="rows"
    />
    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
}

const props = defineProps<{
  modelValue: string
  name: string
  label: string
  placeholder?: string
  rows?: number
  validation?: ValidationRules
}>()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const errorMessage = computed(() => {
  if (!props.validation) return ''

  if (props.validation.required && !props.modelValue) {
    return `${props.label} is required`
  }

  if (props.validation.minLength && props.modelValue.length < props.validation.minLength) {
    return `${props.label} must be at least ${props.validation.minLength} characters`
  }

  if (props.validation.maxLength && props.modelValue.length > props.validation.maxLength) {
    return `${props.label} must be less than ${props.validation.maxLength} characters`
  }

  return ''
})
</script>
