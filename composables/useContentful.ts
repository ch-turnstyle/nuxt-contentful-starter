import type { ContentfulEntry } from '~/types/contentful'
import type { AsyncData } from 'nuxt/app'

export const useContentful = () => {
  const { $contentfulClient, $contentfulPreview } = useNuxtApp();
  const { isPreview } = $contentfulPreview();
  
  const fetchContentEntry = <T>(
    contentType: string, 
    slug: string, 
    options: { key?: string } = {}
  ): AsyncData<ContentfulEntry<T> | null, Error | null> => {
    // Create a unique key for this data fetch
    const key = options.key || `${contentType}-${slug}`;
    
    return useAsyncData<ContentfulEntry<T> | null, Error>(
      key,
      async () => {
        try {
          const entries = await $contentfulClient.getEntries({
            content_type: contentType,
            'fields.slug': slug,
            include: 2
          })
          
          if (entries.items.length > 0) {
            return entries.items[0] as ContentfulEntry<T>
          }
          
          return null
        } catch (error) {
          console.error('Error fetching content:', error)
          throw error instanceof Error ? error : new Error(String(error))
        }
      },
      {
        // Default options for useAsyncData
        server: true,
        lazy: false,
        immediate: true,
        watch: [isPreview], // Add reactive values to watch here if needed
        ...options
      }
    )
  }
  
  // Function to refresh content
  const refreshContent = <T>(key: string): Promise<void> => {
    return refreshNuxtData(key)
  }
  
  return {
    fetchContentEntry,
    refreshContent
  }
}
