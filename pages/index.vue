<script setup lang="ts">
import type { ContentfulLandingPage } from '~/types/contentful';

const { data } = await useAsyncData(async () => {
  const { $contentfulClient } = useNuxtApp();
  return await $contentfulClient.getEntries({
    content_type: 'page',
    include: 2
  });
});

const homepage = computed(() => data.value?.items.find((item: ContentfulLandingPage) => item.fields.slug === 'home'));
</script>

<template>
  <div>
    <UApp>
      <Navigation />
      <div v-for="item in homepage.fields.topSection" :key="item.sys.id">
        <Hero
          v-if="item.sys.contentType.sys.id === 'componentHeroBanner'"
          :data="item.fields"
        />
      </div>
    </UApp>
  </div>
</template>
