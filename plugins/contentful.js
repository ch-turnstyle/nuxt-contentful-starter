import { createClient } from 'contentful'
import { useCookie } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const isPreview = useCookie('contentful-preview');
  const publicAccessToken = import.meta.server ? config.private?.CONTENTFUL_ACCESS_TOKEN : config.public.CONTENTFUL_ACCESS_TOKEN;
  const previewAccessToken = config.public.CONTENTFUL_PREVIEW_ACCESS_TOKEN;

  const createContentfulClient = () => {
    return createClient({
      space: import.meta.server ? config.private?.CONTENTFUL_SPACE_ID : config.public.CONTENTFUL_SPACE_ID,
      accessToken: isPreview.value ? previewAccessToken : publicAccessToken,
      host: isPreview.value ? 'preview.contentful.com' : 'cdn.contentful.com'
    })
  }

  const client = createContentfulClient();
  
  // Provide the client to the app
  nuxtApp.provide('contentfulClient', client)
});
