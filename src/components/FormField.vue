<template>
  <div class="space-y-2">
    <Label :for="name">{{ label }}</Label>
    <Input
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      :min="min"
      :max="max"
      :step="step"
      :class="{ 'border-red-500': errorMessage }"
    />
    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
}

const props = defineProps<{
  modelValue: string | number
  name: string
  label: string
  placeholder?: string
  type?: string
  min?: string | number
  max?: string | number
  step?: string
  validation?: ValidationRules
}>()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? target.valueAsNumber : target.value
  emit('update:modelValue', value)
}

const errorMessage = computed(() => {
  if (!props.validation) return ''

  const value = String(props.modelValue)

  if (props.validation.required && !value) {
    return `${props.label} is required`
  }

  if (props.validation.minLength && value.length < props.validation.minLength) {
    return `${props.label} must be at least ${props.validation.minLength} characters`
  }

  if (props.validation.maxLength && value.length > props.validation.maxLength) {
    return `${props.label} must be less than ${props.validation.maxLength} characters`
  }

  if (props.validation.min !== undefined && Number(value) < props.validation.min) {
    return `${props.label} must be at least ${props.validation.min}`
  }

  if (props.validation.max !== undefined && Number(value) > props.validation.max) {
    return `${props.label} must be less than ${props.validation.max}`
  }

  if (props.validation.pattern && !props.validation.pattern.test(value)) {
    return `${props.label} format is invalid`
  }

  return ''
})
</script>
