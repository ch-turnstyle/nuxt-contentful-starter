<script setup lang="ts">
import { computed } from 'vue';
import type { Document } from '@contentful/rich-text-types';
import { useRichTextRenderer } from '~/composables/useRichTextRenderer';
import type { RichTextOptions } from '~/types/contentful';

interface Props {
  document: Document;
  options?: Partial<RichTextOptions>;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
});

const { renderRichText } = useRichTextRenderer();
const richTextHtml = computed(() => renderRichText(props.document, props.options));
</script>

<template>
  <div class="contentful-rich-text" v-html="richTextHtml"></div>
</template>

<style>
.contentful-rich-text {
  /* Add global styles for your rich text content */
}
</style>