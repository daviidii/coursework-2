import { UserProps } from '../types/UserProps';
<script setup lang="ts">
import type { UserProps } from '@/types/UserProps'

import { ref, reactive, computed } from 'vue'
import { Button } from '@/components/ui/button'
import FormField from './FormField.vue'

const props = defineProps<{
  initialData?: UserProps
  isSubmitting?: boolean
}>()

const emit = defineEmits<{ (e: 'submit', data: UserProps): void }>()

const form = reactive<UserProps>({
  id: props.initialData?.id || 0,
  name: {
    firstname: props.initialData?.name.firstname || '',
    lastname: props.initialData?.name.lastname || '',
  },
  email: props.initialData?.email || '',
  username: props.initialData?.username || '',
  phone: props.initialData?.phone || '',
  password: props.initialData?.password || '',
  address: {
    number: props.initialData?.address.number || 0,
    street: props.initialData?.address.street || '',
    city: props.initialData?.address.city || '',
    zipcode: props.initialData?.address.zipcode || '',
    geolocation: {
      lat: props.initialData?.address.geolocation.lat || '',
      long: props.initialData?.address.geolocation.long || '',
    },
  },
})

const resetForm = () => {
  Object.assign(form, {
    name: {
      firstname: '',
      lastname: '',
    },
    email: '',
    username: '',
    phone: '',
    password: '',
    address: {
      number: 0,
      street: '',
      city: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: '',
      },
    },
  })
}

function handleSubmit() {
  const data: UserProps = {
    id: form.id || Math.floor(Math.random() * 1000), // Generate ID if not provided
    name: {
      firstname: form.name.firstname,
      lastname: form.name.lastname,
    },
    email: form.email,
    username: form.username,
    phone: form.phone,
    password: form.password,
    address: {
      number: form.address.number,
      street: form.address.street,
      city: form.address.city,
      zipcode: form.address.zipcode,
      geolocation: {
        lat: form.address.geolocation.lat,
        long: form.address.geolocation.long,
      },
    },
  }

  emit('submit', data)
}

const simpleRule = { required: true, minLength: 3, maxLength: 100 }
const emailRule = {
  required: true,
  min: 0,
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/,
}
const phoneRule = {
  required: true,
  minLength: 10,
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        :validation="simpleRule"
        name="firstname"
        v-model="form.name.firstname"
        label="First Name"
        type="text"
      />
      <FormField
        :validation="simpleRule"
        v-model="form.name.lastname"
        name="lastname"
        label="Last Name"
        type="text"
      />
      <FormField
        :validation="phoneRule"
        v-model="form.phone"
        name="phone"
        label="Phone number"
        type="text"
      />
      <FormField
        :validation="emailRule"
        v-model="form.email"
        name="email"
        label="Email"
        type="email"
      />

      <FormField
        :validation="simpleRule"
        v-model="form.address.number"
        name="bld-apt-num"
        label="Apt/Bldg number"
        type="text"
      />

      <FormField
        :validation="simpleRule"
        v-model="form.address.street"
        name="street"
        label="Street"
        type="text"
      />
      <FormField
        :validation="simpleRule"
        v-model="form.address.city"
        name="city"
        label="City"
        type="text"
      />
      <FormField
        :validation="simpleRule"
        v-model="form.address.zipcode"
        name="zip"
        label="Zip Code"
        type="text"
      />
      <FormField
        v-model="form.address.geolocation.lat"
        :validation="simpleRule"
        name="latitude"
        label="Latitude"
        type="text"
      />
      <FormField
        v-model="form.address.geolocation.long"
        :validation="simpleRule"
        name="longitude"
        label="Longitude"
        type="text"
      />
    </div>

    <div class="flex justif-end gap-2">
      <Button type="button" variant="outline" @click="resetForm">Reset</Button>
      <Button type="submit" :disabled="isSubmitting"> Add User </Button>
    </div>
  </form>
</template>
