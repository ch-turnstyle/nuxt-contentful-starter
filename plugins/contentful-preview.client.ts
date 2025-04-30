// plugins/contentful-preview.client.ts
import { defineNuxtPlugin } from '#app'
import { useCookie, ref } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // Check if preview mode is enabled via cookie
  const isPreviewCookie = useCookie('contentful-preview')
  
  function useContentfulPreview() {
    // Create a ref that can be watched
    const isPreview = ref(!!isPreviewCookie.value)
    
    return {
      isPreview
    }
  }

  // Make it available throughout the app
  return {
    provide: {
      contentfulPreview: useContentfulPreview
    }
  }
});
