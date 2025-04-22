<script setup lang="ts">
interface Props {
  data: {
    headline?: string
    bodyText?: string
    ctaText?: string
    targetPage?: string
    image?: {
      fields: {
        description?: string,
        file?: {
          url?: string,
        },
        title?: string,
      }
    }
    imageStyle?: boolean
    heroSize?: boolean
    colorPalette?: string
  }
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <div class="absolute inset-0 w-full h-full" v-if="props.data.image">
      <NuxtImg :src="`https:${props.data.image?.fields.file?.url}`" />
    </div>
    <UContainer>
      <h1 class="relative text-5xl">{{ props.data.headline }}</h1>
    </UContainer>
  </div>
</template>
