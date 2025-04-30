<script setup lang="ts">
import type { ContentfulImage } from '~/types/contentful';

interface Props {
  image?: ContentfulImage;
  class?: string;
}
const props = defineProps<Props>();
const imageProps = ref();

const { renderLazyImage } = useContentfulImage();

imageProps.value = computed(() => renderLazyImage(
  props.image,
  {
    class: props.class,
  }
));
</script>

<template>
  <picture>
    <source v-bind="imageProps.value.srcData" />
    <VLazyImage v-bind="imageProps.value" />
  </picture>
</template>
