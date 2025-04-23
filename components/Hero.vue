<script setup lang="ts">
import type { Document } from '@contentful/rich-text-types';
import type { ContentfulImage } from '~/types/contentful';

interface Props {
  data: {
    headline?: string;
    bodyText?: Document;
    ctaText?: string;
    targetPage?: string;
    image?: ContentfulImage;
    imageStyle?: boolean;
    heroSize?: boolean;
    colorPalette?: string;
  }
  imageOptions?: Record<string, any>;
}
const props = defineProps<Props>();

const { renderImage } = useContentfulImage();
const imageProps = computed(() => renderImage(
  props.data.image,
  {
    ...props.imageOptions,
    sizesPreset: 'hero',
    imgAttrs: {
      class: 'absolute inset-0 w-full h-full object-cover',
    }
  }
));

const richTextContent = computed(() => props.data.bodyText || null);
</script>

<template>
  <div class="relative">
    <NuxtPicture 
      v-if="imageProps"
      v-bind="imageProps"
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
