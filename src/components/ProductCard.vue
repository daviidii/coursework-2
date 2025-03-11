<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { ProductItemProps } from '@/types/ProductItemProps'
import { computed, ref } from 'vue'

const props = defineProps<{ item: ProductItemProps; isDeleting: boolean }>()
const showFullDescription = ref<boolean>(false)

const truncatedDescription = computed(() => {
  let desc = props.item.description
  if (!showFullDescription.value) {
    desc = props.item.description.substring(0, 90) + '...'
  }
  return desc
})

const setShowFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

defineEmits(['onDelete', 'onUpdate'])
</script>
<template>
  <Card class="flex flex-col">
    <CardHeader>
      <div class="w-full h-48 overflow-hidden flex items-center justify-center">
        <img
          :src="props.item.image"
          :alt="`image of ${props.item.title}`"
          class="w-full h-full object-contain"
        />
      </div>
    </CardHeader>
    <CardContent class="h-full">
      <div class="space-y-2.5">
        <Badge variant="outline" class="py-1.5">{{ props.item.category }}</Badge>

        <CardTitle>{{ props.item.title }}</CardTitle>
        <div>
          <CardDescription>{{ truncatedDescription }}</CardDescription>
          <Button variant="link" class="p-0" @click="setShowFullDescription">{{
            showFullDescription ? 'show less' : 'show more'
          }}</Button>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <div class="flex items-center gap-2 flex-wrap">
        <Button :disabled="isDeleting" size="sm" @click="$emit('onUpdate')"> update </Button>
        <Button :disabled="isDeleting" variant="destructive" size="sm" @click="$emit('onDelete')">
          remove
        </Button>
      </div>
    </CardFooter>
  </Card>
</template>
