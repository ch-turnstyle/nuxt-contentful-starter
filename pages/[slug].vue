<script setup lang="ts">
import type { LandingPageFields } from '~/types/contentful'

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const { fetchContentEntry, refreshContent } = useContentful();

// Create a reactive key that changes when the slug changes
const contentKey = computed(() => `page-${slug.value}`)

// Fetch the page content using useAsyncData under the hood
const { data: page, status, error, refresh } = fetchContentEntry<LandingPageFields>(
  'landingPageDefault', 
  slug.value,
  { key: contentKey.value }
)

// Set up SEO
useSeo(page)
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <p class="absolute">Loading...</p>
    </div>
    <div v-if="error">
      <p>Error loading page: {{ error }}</p>
    </div>
    <div v-else-if="page">
      <UApp>
        <Navigation />
        <Hero v-bind="page.fields.hero?.fields" />
        <template v-if="page.fields.components">
          <section v-for="component in page.fields.components" :key="component.sys.id">
            <template v-if="component.sys.contentType.sys.id === 'newsletterSignup'">
              <UContainer class=" py-10">
                <h2 class="text-4xl my-4">{{ component.fields.headline }}</h2>
                <NewsletterSignup />
              </UContainer>
            </template>
          </section>
        </template>
      </UApp>
    </div>
    <div v-else>
      <p>Page not found</p>
    </div>
  </div>
</template>