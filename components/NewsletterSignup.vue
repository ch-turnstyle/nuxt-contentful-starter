<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const form = useTemplateRef('form');
const result = ref('');
const status = ref('');

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Please enter your name.')),
  email: v.pipe(v.string(), v.nonEmpty('Please enter your email.'), v.email('Invalid email')),
  subject: v.pipe(v.string(), v.nonEmpty('Subject required')),
  access_key: v.pipe(v.string(), v.nonEmpty('Access key is required')),
})

type Schema = v.InferOutput<typeof schema>

const defaultState = {
  name: '',
  email: '',
  subject: '',
  access_key: '',
};

const state = reactive({
  name: '',
  email: '',
  subject: 'New Submission from Web3Forms',
  access_key: '2443906b-9c5f-4c0c-8c89-7f6a2c256c70', // Public Access Key
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  result.value = "Please wait...";

  try {
    const response = await $fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.data,
    });

    console.log(response); // You can remove this line if you don't need it

    result.value = response.message;

    if (response.success) {
      status.value = 'success';
      toast.add({ title: 'Success', description: response.message, color: 'success' })
    } else {
      console.log(response); // Log for debugging, can be removed
      status.value = 'error';
      toast.add({ title: 'Error', description: response.message, color: 'error' })
    }
  } catch (error) {
    console.log(error); // Log for debugging, can be removed
    status.value = 'error';
    result.value = 'Something went wrong!';
  } finally {
    // Reset form after submission
    Object.assign(state, defaultState);

    // Clear result and status after 5 seconds
    setTimeout(() => {
      result.value = '';
      status.value = '';
    }, 5000);
  }
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-8 flex flex-wrap items-center" @submit="onSubmit">
    <UFormField class="mr-4" label="Name" name="name">
      <UInput v-model="state.name" type="text" />
    </UFormField>

    <UFormField class="mr-4" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>
