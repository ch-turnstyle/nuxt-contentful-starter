<script setup lang="ts">
import type { Document } from '@contentful/rich-text-types';

interface Props {
  data: {
    headline?: string;
    bodyText?: Document;
    ctaText?: string;
    targetPage?: string;
    image?: {
      fields: {
        description?: string;
        file: {
          url: string;
        };
        title: string;
      };
    };
    imageStyle?: boolean;
    heroSize?: boolean;
    colorPalette?: string;
  }
}

const props = defineProps<Props>();

const richTextContent = computed(() => props.data.bodyText || null);
</script>

<template>
  <div class="relative">
    <NuxtImg
      v-if="props.data.image"
      :src="`https:${props.data.image?.fields.file.url}`"
      :alt="props.data.image?.fields.title"
      sizes="100vw"
      placeholder
      placeholder-class="custom"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <UContainer class="relative w-full h-full min-h-[75vh] flex items-center">
      <div class="flex flex-col py-10 h-full w-full lg:w-1/2">
        <h1 class="text-5xl font-bold mb-4" :class="[!props.data.headline && 'sr-only']">{{ props.data.headline || 'App Name' }}</h1>
        <ContentfulRichText 
          v-if="richTextContent" 
          :document="richTextContent"
        />
      </div>
    </UContainer>
  </div>
</template>

<style>
@reference '~/assets/css/main.css';

.contentful-rich-text {
  p {
    @apply text-2xl;
  }
}
</style>
