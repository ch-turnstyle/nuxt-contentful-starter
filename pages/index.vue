<script setup lang="ts">
import type { LandingPageFields } from '~/types/contentful';

const slug = 'home';
const { fetchContentEntry, refreshContent } = useContentful();

// Create a reactive key that changes when the slug changes
const contentKey = computed(() => `page-${slug}`)

// Fetch the page content using useAsyncData under the hood
const { data: page, status, error, refresh } = fetchContentEntry<LandingPageFields>(
  'landingPageDefault',
  slug,
  { key: contentKey.value }
)

// SEO
useSeo(page);
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <p class="absolute">Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Error loading page: {{ error }}</p>
    </div>
    <div v-else-if="page">
      <UApp>
        <Navigation />
        <template v-if="page.fields.hero">
          <Hero v-bind="page.fields.hero.fields" />
        </template>
      </UApp>
    </div>
    <div v-else>
      <p>Page not found</p>
    </div>
  </div>
</template>
