<template>
  <div class="space-y-2">
    <Label :for="name">{{ label }}</Label>
    <Select :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
      <SelectTrigger :id="name" :class="{ 'border-red-500': errorMessage }">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
    <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectOption {
  value: string
  label: string
}

interface ValidationRules {
  required?: boolean
}

const props = defineProps<{
  modelValue: string
  name: string
  label: string
  placeholder?: string
  options: SelectOption[]
  validation?: ValidationRules
}>()

defineEmits(['update:modelValue'])

const errorMessage = computed(() => {
  if (!props.validation) return ''

  if (props.validation.required && !props.modelValue) {
    return `${props.label} is required`
  }

  return ''
})
</script>
