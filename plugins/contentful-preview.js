import { useCookie } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const isPreviewCookie = useCookie('contentful-preview')
  
  const contentfulPreview = () => {
    // Create a ref that can be watched
    const isPreview = ref(!!isPreviewCookie.value)
    
    // Update the ref when the cookie changes
    watch(isPreviewCookie, () => {
      isPreview.value = !!isPreviewCookie.value
    })
    
    return {
      isPreview
    }
  }

  return {
    provide: {
      contentfulPreview
    }
  }
});