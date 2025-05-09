<script setup lang="ts">
import type { Document } from '@contentful/rich-text-types';
import type { ContentfulEntry, ContentfulImage, LandingPageFields } from '~/types/contentful';
import Image from './Image.vue';

interface Props {
  colorTheme?: { fields: { palette: string; } };
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

const richTextRef = ref();
const colorThemeRef = ref(props.colorTheme);

richTextRef.value = computed(() => props.content || null);
const { theme } = useColorTheme(colorThemeRef);

</script>

<template>
  <section class="relative overflow-hidden" :class="theme">
    <Image v-if="props.image" :image="props.image" class="absolute inset-0 w-full h-full object-cover" />
    <UContainer class="relative w-full h-full min-h-[75vh] flex items-center">
      <div class="flex flex-col py-10 h-full w-full lg:w-1/2">
        <h1 class="text-5xl font-bold mb-4" :class="[!props.headline && 'sr-only']">{{ props.headline || 'Contentful Starter' }}</h1>
        <ContentfulRichText 
          v-if="richTextRef.value" 
          :document="richTextRef.value"
        />
      </div>
    </UContainer>
  </section>
</template>

<style>
@reference '@/assets/css/main.css';
.contentful-rich-text {
  p {
    @apply text-2xl;
  }
}
</style>
