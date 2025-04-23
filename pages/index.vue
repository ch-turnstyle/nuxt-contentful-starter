<script setup lang="ts">
import type { PageFields } from '~/types/contentful';

const slug = 'home';
const { fetchContentEntry, refreshContent } = useContentful();

// Create a reactive key that changes when the slug changes
const contentKey = computed(() => `page-${slug}`)

// Fetch the page content using useAsyncData under the hood
const { data: page, status, error, refresh } = fetchContentEntry<PageFields>(
  'page',
  slug,
  { key: contentKey.value }
)

// SEO
useSeo(page);
</script>

<template>
  <div v-if="status === 'pending'">
    <p>Loading...</p>
  </div>
  <div v-else-if="error">
    <p>Error loading page: {{ error }}</p>
  </div>
  <div v-else-if="page">
    <UApp>
      <Navigation />
      <div v-for="section in page.fields.topSection" :key="section.sys.id">
        <Hero
          v-if="section.sys.contentType.sys.id === 'componentHeroBanner'"
          :data="section.fields"
        />
      </div>
    </UApp>
  </div>
  <div v-else>
    <p>Page not found</p>
  </div>
</template>
