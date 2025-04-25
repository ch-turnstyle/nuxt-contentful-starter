<script setup lang="ts">
import type { PageFields } from '~/types/contentful'

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { fetchContentEntry, refreshContent } = useContentful();

// Create a reactive key that changes when the slug changes
const contentKey = computed(() => `page-${slug.value}`)

// Fetch the page content using useAsyncData under the hood
const { data: page, status, error, refresh } = fetchContentEntry<PageFields>(
  'page', 
  slug.value,
  { key: contentKey.value }
)

// Set up SEO
useSeo(page)
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
      <div class="h-full w-full bg-gradient-to-r from-violet-500 to-fuchsia-700">
        <UContainer>
          <div class="flex items-center h-full min-h-[75vh]">
            <h1 class="text-7xl font-bold text-white">{{ page.fields.pageName }}</h1>
          </div>
        </UContainer>
      </div>
    </UApp>
  </div>
  <div v-else>
    <p>Page not found</p>
  </div>
</template>