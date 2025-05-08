<script setup lang="ts">
import type { Document } from '@contentful/rich-text-types';
import type { ContentfulEntry, ContentfulImage, LandingPageFields } from '~/types/contentful';
import Image from './Image.vue';

interface Props {
  colorTheme?: Array<{}>;
  style?: boolean;
  subhead?: string;
  subheadLink?: ContentfulEntry<LandingPageFields>;
  headline: string;
  content?: Document;
  ctaText?: string;
  targetPage?: ContentfulEntry<LandingPageFields>;
  image?: ContentfulImage;
  imageStyle?: boolean;
}
const props = defineProps<Props>();
const richTextContent = ref();

richTextContent.value = computed(() => props.content || null);
</script>

<template>
  <div class="relative overflow-hidden">
    <Image v-if="props.image" :image="props.image" class="absolute inset-0 w-full h-full object-cover" />
    <UContainer class="relative w-full h-full min-h-[75vh] flex items-center">
      <div class="flex flex-col py-10 h-full w-full lg:w-1/2">
        <h1 class="text-5xl font-bold mb-4" :class="[!props.headline && 'sr-only']">{{ props.headline || 'Contentful Starter' }}</h1>
        <ContentfulRichText 
          v-if="richTextContent.value" 
          :document="richTextContent.value"
        />
      </div>
    </UContainer>
  </div>
</template>

<style>
@reference '@/assets/css/main.css';
.contentful-rich-text {
  p {
    @apply text-2xl;
  }
}
</style>
