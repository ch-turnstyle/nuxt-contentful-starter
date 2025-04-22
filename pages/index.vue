<script setup lang="ts">
import type { CtfLandingPage } from '~/types/contentful';

const { data } = await useAsyncData(async () => {
  const { $contentfulClient } = useNuxtApp();
  return await $contentfulClient.getEntries({
    content_type: 'page',
    include: 2
  });
});
const homepage = data.value?.items.find((item: CtfLandingPage) => item.fields.slug === 'home');
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
